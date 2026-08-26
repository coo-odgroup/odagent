import {
  Component,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { Login } from '../model/login';
import { RoleService } from '.././services/role.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../constant/constant';
import { EncryptionService } from '../encrypt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public form: FormGroup;
  public loginRecord: Login;
  usertypes: [];
  fieldTextType = false;

  public saveUsername: boolean;

  forgotOtp: string = '';

  forgotOtpBoxes: string[] = ['', '', '', '', '', ''];

  otpBoxes = [0, 1, 2, 3, 4, 5];

  @ViewChildren('forgotOtpInput')
  forgotOtpInputs!: QueryList<ElementRef>;
  /* ==========================================================
   AUTH PAGE STATE
   ========================================================== */

  authView:
    | 'login'
    | 'signup'
    | 'signupOtp'
    | 'signupKyc'
    | 'forgot'
    | 'forgotOtp'
    | 'newPassword' = 'login';

  /* ==========================================================
     SIGNUP
     ========================================================== */

  public signupForm: FormGroup;

  public signupOtp: string = '';

  public signupOtpBoxes: string[] = ['', '', '', '', '', ''];

  public signupOtpVerified: boolean = false;

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef>;

  /* ==========================================================
     KYC
     ========================================================== */

  public kycForm: FormGroup;

  public panFileName: string = '';

  public aadhaarFileName: string = '';

  public panFile: File | null = null;

  public aadhaarFile: File | null = null;

  /* ==========================================================
     FORGOT PASSWORD
     ========================================================== */

  public forgotForm: FormGroup;

  // public forgotOtp: string = '';

  public forgotOtpVerified: boolean = false;

  /* ==========================================================
     NEW PASSWORD
     ========================================================== */

  public passwordForm: FormGroup;

  public newPasswordVisible: boolean = false;

  public confirmPasswordVisible: boolean = false;
  public onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;
  }

  constructor(
    public router: Router,
    protected fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private notify: NotificationService,
    private roleService: RoleService,
    private enc: EncryptionService,
    private http: HttpClient,
  ) {
    this.roleService.getRoles().subscribe((res) => {
      this.usertypes = res.data;
    });
  }

  ngOnInit() {
    /* ==========================================================
       LOGIN FORM
       ========================================================== */

    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],

      password: [null, Validators.compose([Validators.required])],

      user_type: [null],
    });

    /* ==========================================================
       SIGNUP FORM
       ========================================================== */

    this.signupForm = this.fb.group({
      fullname: [null, Validators.required],

      mobileNo: [
        null,
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
      ],

      email: [null, [Validators.required, Validators.email]],

      location: [null, Validators.required],

      businessName: [null],
    });

    /* ==========================================================
       KYC FORM
       ========================================================== */

    this.kycForm = this.fb.group({
      pan: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)],
      ],

      aadhaar: [null, [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
    });

    /* ==========================================================
       FORGOT PASSWORD FORM
       ========================================================== */

    this.forgotForm = this.fb.group({
      mobile: [null, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    });

    /* ==========================================================
       NEW PASSWORD FORM
       ========================================================== */

    this.passwordForm = this.fb.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],

        confirmPassword: [null, Validators.required],
      },
      {
        validators: this.passwordMatchValidator.bind(this),
      },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;

    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordMismatch: true,
      };
    }

    return null;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  /* ==========================================================
     LOGIN / SIGNUP NAVIGATION
     ========================================================== */

  openSignup() {
    this.authView = 'signup';

    this.signupOtp = '';

    this.signupOtpBoxes = ['', '', '', '', '', ''];
  }

  backToLogin() {
    this.authView = 'login';
  }

  backToSignup() {
    this.authView = 'signup';
  }

  backToSignupOtp() {
    this.authView = 'signupOtp';
  }
  ResetForm() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      user_type: [null],
    });
  }
  check_credentials() {
    const data = {
      email: this.form.value.email,
      password: this.form.value.password,
      user_type: 3,
    };
    // console.log(data);
    // return;

    this.loginService.checkLogin(data).subscribe(
      (res) => {
        if (res.status == 1) {
          let loginRecord: any = this.enc.decrypt(res.data);
          loginRecord = JSON.parse(loginRecord);
          console.log(loginRecord);
          this.loginRecord = loginRecord;
          localStorage.setItem('USERRECORDS', JSON.stringify(this.loginRecord));
          localStorage.setItem('USERID', JSON.stringify(this.loginRecord.id));
          localStorage.setItem(
            'ROLE_ID',
            JSON.stringify(this.loginRecord.role_id),
          );
          localStorage.setItem('USERNAME', this.loginRecord.name);
          localStorage.setItem('USER_BUS_OPERATOR_ID', '');
          if (this.loginRecord.role_id == 4) {
            localStorage.setItem(
              'USER_BUS_OPERATOR_ID',
              this.loginRecord.user_bus_operator.bus_operator.id,
            );
          }

          if (this.loginRecord.is_password_changed == 0) {
            this.router.navigate(['/agent/first-change-password']);
          }
          else if (this.loginRecord.is_first_recharge_done == 0) {
            this.router.navigate(['/agent/first-time-recharge']);
          }
          else {
            this.router.navigate(['/dashboard/landing']);
          }
          // var ROLE_ID = localStorage.getItem("ROLE_ID");
          // var USERID = localStorage.getItem("USERID");
          // console.log("ROLE ID : "+ROLE_ID+", USER ID : "+USERID);
          // this.router.navigate(['dashboard/landing']);
        } else {
          this.notify.notify(res.message, 'Error');
        }
      },
      (error) => {
        this.notify.notify(error.error.message, 'Error');
      },
    );
  }

  /* ==========================================================
   SIGNUP OTP
   ========================================================== */

  userId: any;

  generateSignupOtp() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();

      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const data = {
      fullname: this.signupForm.value.fullname,
      email: this.signupForm.value.email,
      mobileNo: this.signupForm.value.mobileNo,
      location: this.signupForm.value.location,
      businessName: this.signupForm.value.businessName,
    };

    this.http
      .post(this.apiURL + '/agentRegd', data, { headers: headers })
      .subscribe(
        (res: any) => {
          if (res.status === true || res.status === 1) {
            this.userId = res.userId;

            this.signupOtp = '';

            this.signupOtpBoxes = ['', '', '', '', '', ''];

            this.authView = 'signupOtp';

            this.notify.notify(res.message, 'Success');
          } else {
            this.notify.notify(res.message, 'Error');
          }
        },
        (error: any) => {
          console.error('Agent Regd API Error:', error);
        },
      );
  }

  verifySignupOtp() {
    if (!this.signupOtp || this.signupOtp.length !== 6) {
      return;
    }

    const data = {
      userId: this.userId,
      type: 1,
      otp: this.signupOtp,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post(this.apiURL + '/agentRegdOtpVerify', data, { headers: headers })
      .subscribe(
        (res: any) => {
          if (res.status == 1 || res.status === true) {
            this.signupOtpVerified = true;
            this.authView = 'signupKyc';
            this.notify.notify(res.message, 'Success');
          } else {
            this.notify.notify(res.message, 'Error');
          }
        },
        (error: any) => {
          console.error('Agent Regd OTP Verify Error:', error);
        },
      );
  }

  resendSignupOtp() {
    /*
     * PUT YOUR ACTUAL RESEND OTP API HERE.
     */

    console.log('Resend Signup OTP');
  }
  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;

    const value = input.value.replace(/\D/g, '').slice(-1);

    input.value = value;

    this.signupOtpBoxes[index] = value;

    this.signupOtp = this.signupOtpBoxes.join('');

    if (value && index < 5) {
      setTimeout(() => {
        const inputs = this.otpInputs.toArray();

        inputs[index + 1]?.nativeElement.focus();
      });
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value) {
        input.value = '';

        this.signupOtpBoxes[index] = '';

        this.signupOtp = this.signupOtpBoxes.join('');

        return;
      }

      if (index > 0) {
        const inputs = this.otpInputs.toArray();

        const previousInput = inputs[index - 1]?.nativeElement;

        if (previousInput) {
          previousInput.value = '';

          this.signupOtpBoxes[index - 1] = '';

          this.signupOtp = this.signupOtpBoxes.join('');

          setTimeout(() => {
            previousInput.focus();
          });
        }
      }
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData
      ?.getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pastedText) {
      return;
    }

    const inputs = this.otpInputs.toArray();

    this.signupOtpBoxes = ['', '', '', '', '', ''];

    pastedText.split('').forEach((digit, index) => {
      this.signupOtpBoxes[index] = digit;

      if (inputs[index]) {
        inputs[index].nativeElement.value = digit;
      }
    });

    this.signupOtp = this.signupOtpBoxes.join('');

    const focusIndex = Math.min(pastedText.length, 5);

    setTimeout(() => {
      inputs[focusIndex]?.nativeElement.focus();
    });
  }
  /* ==========================================================
     KYC FILES
     ========================================================== */

  onPanFileSelected(event: any) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    this.panFile = file;

    this.panFileName = file.name;
  }

  onAadhaarFileSelected(event: any) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    this.aadhaarFile = file;

    this.aadhaarFileName = file.name;
  }

  submitSignup() {
    if (this.kycForm.invalid) {
      this.kycForm.markAllAsTouched();

      return;
    }

    const registrationData = {
      ...this.signupForm.value,

      ...this.kycForm.value,

      panDocument: this.panFile,

      aadhaarDocument: this.aadhaarFile,
    };

    // console.log('FINAL REGISTRATION DATA:', registrationData);

    /*
     * PUT YOUR ACTUAL REGISTRATION API HERE.
     *
     * Because PAN/Aadhaar documents are files,
     * this will most likely need FormData.
     */

    const formData = new FormData();

    formData.append('agentId', this.userId);
    formData.append('panNo', registrationData.pan);
    formData.append('panImage', registrationData.panDocument);
    formData.append('adhaarNo', registrationData.aadhaar);
    formData.append('adhaarImage', registrationData.aadhaarDocument);

    this.http
      .post(this.apiURL + '/agentUpdateData', formData)
      .subscribe(
        (res: any) => {
          if (res.status == 1 || res.status === true) {
            this.notify.notify(res.message, 'Success');
            window.location.reload();
          } else {
            this.notify.notify(res.message, 'Error');
          }
        },
        (error: any) => {
          console.error('Agent Update Error:', error);
        }
      );
  }

  /* ==========================================================
     FORGOT PASSWORD FLOW
     ========================================================== */

  openForgotPassword() {
    this.authView = 'forgot';

    this.forgotOtp = '';
  }

  backToForgot() {
    this.authView = 'forgot';
  }

  generateForgotOtp() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();

      return;
    }

    /*
     * PUT YOUR ACTUAL FORGOT PASSWORD
     * SEND OTP API HERE.
     */

    // console.log('Generate Forgot Password OTP', this.forgotForm.value.mobile);

    // TEMPORARY UI FLOW

    this.authView = 'forgotOtp';
  }

  verifyForgotOtp() {
    if (!this.forgotOtp || this.forgotOtp.length !== 6) {
      return;
    }

    /*
     * PUT YOUR ACTUAL FORGOT PASSWORD
     * OTP VERIFICATION API HERE.
     */

    console.log('Verify Forgot OTP:', this.forgotOtp);

    // TEMPORARY UI FLOW

    this.forgotOtpVerified = true;

    this.authView = 'newPassword';
  }

  resendForgotOtp() {
    /*
     * PUT YOUR ACTUAL RESEND OTP API HERE.
     */

    console.log('Resend Forgot Password OTP');
  }

  onForgotOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;

    // Keep only numbers
    const value = input.value.replace(/\D/g, '').slice(-1);

    // Set the current box value
    input.value = value;

    // Store value
    this.forgotOtpBoxes[index] = value;

    // Create complete OTP
    this.forgotOtp = this.forgotOtpBoxes.join('');

    // Move to next box
    if (value && index < 5) {
      setTimeout(() => {
        const inputs = this.forgotOtpInputs.toArray();

        inputs[index + 1]?.nativeElement.focus();
      });
    }
  }

  onForgotOtpKeydown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // BACKSPACE
    if (event.key === 'Backspace') {
      // If current box has value, clear it
      if (input.value) {
        input.value = '';

        this.forgotOtpBoxes[index] = '';

        this.forgotOtp = this.forgotOtpBoxes.join('');

        return;
      }

      // If current box is empty, move to previous box
      if (index > 0) {
        const inputs = this.forgotOtpInputs.toArray();

        const previousInput = inputs[index - 1]?.nativeElement;

        if (previousInput) {
          previousInput.value = '';

          this.forgotOtpBoxes[index - 1] = '';

          this.forgotOtp = this.forgotOtpBoxes.join('');

          setTimeout(() => {
            previousInput.focus();
          });
        }
      }
    }
  }

  onForgotOtpPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData
      ?.getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pastedText) {
      return;
    }

    const inputs = this.forgotOtpInputs.toArray();

    // Clear existing boxes
    this.forgotOtpBoxes = ['', '', '', '', '', ''];

    // Put pasted digits into boxes
    pastedText.split('').forEach((digit, index) => {
      this.forgotOtpBoxes[index] = digit;

      if (inputs[index]) {
        inputs[index].nativeElement.value = digit;
      }
    });

    // Create complete OTP
    this.forgotOtp = this.forgotOtpBoxes.join('');

    // Focus last entered / next box
    const focusIndex = Math.min(pastedText.length, 5);

    setTimeout(() => {
      inputs[focusIndex]?.nativeElement.focus();
    });
  }

  createNewPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();

      return;
    }

    const passwordData = {
      mobile: this.forgotForm.value.mobile,

      otp: this.forgotOtp,

      password: this.passwordForm.value.password,
    };

    console.log('Reset Password Data:', passwordData);

    /*
     * PUT YOUR ACTUAL RESET PASSWORD API HERE.
     *
     * Example:
     *
     * this.loginService.resetPassword(
     *   passwordData
     * ).subscribe(res => {
     *
     *   if (res.status == 1) {
     *
     *     this.authView = 'login';
     *
     *     this.forgotForm.reset();
     *     this.passwordForm.reset();
     *     this.forgotOtp = '';
     *
     *   }
     *
     * });
     */
  }

  checkEmailExist() {
    const email = this.signupForm.get('email')?.value;

    if (!email || this.signupForm.get('email')?.invalid) {
      return;
    }

    const data = {
      email: email,
    };

    this.http.post(this.apiURL + '/checkEmailExist', data).subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.signupForm.get('email')?.setValue('');
          this.notify.notify(res.message, 'Error');
        }
      },
      (error: any) => {
        console.error('Email check error:', error);
        this.notify.notify(error, 'Error');
      },
    );
  }

  allowOnlyNumbers(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 10);

    this.signupForm
      .get('mobileNo')
      ?.setValue(event.target.value, { emitEvent: false });
  }
}
