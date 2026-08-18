import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Login } from '../model/login';
import { RoleService } from '.././services/role.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../constant/constant';
import { EncryptionService } from '../encrypt.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loginRecord: Login;
  usertypes: [];
  fieldTextType = false;

  public saveUsername: boolean;
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

  public signupOtpVerified: boolean = false;


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

  public forgotOtp: string = '';

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

  constructor(public router: Router, protected fb: FormBuilder, private loginService: LoginService, private notificationService: NotificationService, private notify: NotificationService, private roleService: RoleService, private enc: EncryptionService) {

    this.roleService.getRoles().subscribe(
      res => {
        this.usertypes = res.data;
      }
    );
  }

  ngOnInit() {

    /* ==========================================================
       LOGIN FORM
       ========================================================== */

    this.form = this.fb.group({

      email: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],

      password: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],

      user_type: [null]

    });


    /* ==========================================================
       SIGNUP FORM
       ========================================================== */

    this.signupForm = this.fb.group({

      name: [
        null,
        Validators.required
      ],

      mobile: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],

      signupEmail: [
        null,
        [
          Validators.required,
          Validators.email
        ]
      ],

      city: [
        null,
        Validators.required
      ],

      businessName: [
        null
      ]

    });


    /* ==========================================================
       KYC FORM
       ========================================================== */

    this.kycForm = this.fb.group({

      pan: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
        ]
      ],

      aadhaar: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{12}$/)
        ]
      ]

    });


    /* ==========================================================
       FORGOT PASSWORD FORM
       ========================================================== */

    this.forgotForm = this.fb.group({

      mobile: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ]

    });


    /* ==========================================================
       NEW PASSWORD FORM
       ========================================================== */

    this.passwordForm = this.fb.group({

      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        null,
        Validators.required
      ]

    }, {

      validators: this.passwordMatchValidator.bind(this)

    });

  }

  passwordMatchValidator(form: FormGroup) {

    const password = form.get('password')?.value;

    const confirmPassword = form.get('confirmPassword')?.value;

    if (
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {

      return {
        passwordMismatch: true
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

      res => {

        if (res.status == 1) {
          let loginRecord: any = this.enc.decrypt(res.data);
          loginRecord = JSON.parse(loginRecord);
          this.loginRecord = loginRecord;
          localStorage.setItem("USERRECORDS", JSON.stringify(this.loginRecord));
          localStorage.setItem("USERID", JSON.stringify(this.loginRecord.id));
          localStorage.setItem("ROLE_ID", JSON.stringify(this.loginRecord.role_id));
          localStorage.setItem("USERNAME", this.loginRecord.name);
          localStorage.setItem("USER_BUS_OPERATOR_ID", '');
          if (this.loginRecord.role_id == 4) {
            localStorage.setItem("USER_BUS_OPERATOR_ID", this.loginRecord.user_bus_operator.bus_operator.id);
          }
          // var ROLE_ID = localStorage.getItem("ROLE_ID");
          // var USERID = localStorage.getItem("USERID");
          // console.log("ROLE ID : "+ROLE_ID+", USER ID : "+USERID);
          this.router.navigate(['dashboard/landing']);
        } else {
          this.notify.notify(res.message, "Error");
        }
      },
      error => {
        this.notify.notify(error.error.message, "Error");
      }
    );
  }


  /* ==========================================================
   SIGNUP OTP
   ========================================================== */

generateSignupOtp() {

  if (this.signupForm.invalid) {

    this.signupForm.markAllAsTouched();

    return;

  }


  /*
   * IMPORTANT:
   *
   * PUT YOUR ACTUAL SIGNUP / SEND OTP API HERE.
   *
   * Example:
   *
   * this.loginService.generateSignupOtp(
   *   this.signupForm.value.mobile
   * ).subscribe(res => {
   *
   * });
   */


  console.log(
    'Generate Signup OTP',
    this.signupForm.value
  );


  // TEMPORARY UI FLOW
  // After API successfully sends OTP:
  this.authView = 'signupOtp';

}


verifySignupOtp() {

  if (!this.signupOtp || this.signupOtp.length !== 6) {

    return;

  }


  /*
   * PUT YOUR ACTUAL OTP VERIFY API HERE.
   *
   * Example:
   *
   * this.loginService.verifySignupOtp(
   *   this.signupForm.value.mobile,
   *   this.signupOtp
   * ).subscribe(res => {
   *
   *   if (res.status == 1) {
   *
   *     this.authView = 'signupKyc';
   *
   *   }
   *
   * });
   */


  console.log(
    'Verify Signup OTP:',
    this.signupOtp
  );


  // TEMPORARY UI FLOW
  this.signupOtpVerified = true;

  this.authView = 'signupKyc';

}

resendSignupOtp() {

  /*
   * PUT YOUR ACTUAL RESEND OTP API HERE.
   */

  console.log(
    'Resend Signup OTP'
  );

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

    aadhaarDocument: this.aadhaarFile

  };


  console.log(
    'FINAL REGISTRATION DATA:',
    registrationData
  );


  /*
   * PUT YOUR ACTUAL REGISTRATION API HERE.
   *
   * Because PAN/Aadhaar documents are files,
   * this will most likely need FormData.
   */


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


  console.log(
    'Generate Forgot Password OTP',
    this.forgotForm.value.mobile
  );


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


  console.log(
    'Verify Forgot OTP:',
    this.forgotOtp
  );


  // TEMPORARY UI FLOW

  this.forgotOtpVerified = true;

  this.authView = 'newPassword';

}

resendForgotOtp() {

  /*
   * PUT YOUR ACTUAL RESEND OTP API HERE.
   */

  console.log(
    'Resend Forgot Password OTP'
  );

}

createNewPassword() {

  if (this.passwordForm.invalid) {

    this.passwordForm.markAllAsTouched();

    return;

  }


  const passwordData = {

    mobile: this.forgotForm.value.mobile,

    otp: this.forgotOtp,

    password: this.passwordForm.value.password

  };


  console.log(
    'Reset Password Data:',
    passwordData
  );


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
}
