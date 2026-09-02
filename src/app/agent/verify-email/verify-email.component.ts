import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../constant/constant';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  otp: string = '';

  otpSent: boolean = false;
  otpError: string = '';

  isEmailEditable: boolean = false;

  @ViewChild('emailInput') emailInput!: ElementRef;

  private apiURL = Constants.BASE_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    // Get email from local storage if already available
    const USERRECORDS = JSON.parse(localStorage.getItem('USERRECORDS') || '{}');
    this.email = USERRECORDS.email;
  }

  sendOtp(): void {
    if (!this.email) {
      this.notify.notify('Please enter your email address.', 'Error');
      return;
    }

    this.otpError = '';

    const data = {
      userId: localStorage.getItem('USERID'),
      email: this.email,
    };

    console.log('Sending OTP with data:', data);

    this.http
      .post(this.apiURL + '/send-email-otp', data, this.httpOptions)
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.status === true) {
            this.otpSent = true;

            const updatedEmail = this.email;

            const userRecords = JSON.parse(
              localStorage.getItem('USERRECORDS') || '{}'
            );

            if (userRecords && userRecords.id) {
              userRecords.email = updatedEmail;

              localStorage.setItem(
                'USERRECORDS',
                JSON.stringify(userRecords)
              );
            }

            this.notify.notify(
              response.message || 'OTP sent successfully.',
              'Success',
            );
          } else {
            this.notify.notify(
              response.message || 'Unable to send OTP.',
              'Error',
            );
          }
        },
        (error) => {
          console.error('Send OTP error:', error);

          if (error.error && error.error.message) {
            this.notify.notify(error.error.message, 'Error');
          } else {
            this.notify.notify(
              'Something went wrong. Please try again.',
              'Error',
            );
          }
        },
      );
  }

  verifyOtp(): void {
    if (!this.otp) {
      this.notify.notify('Please enter the OTP.', 'Error');

      return;
    }

    if (this.otp.length !== 6) {
      this.notify.notify('Please enter a valid 6-digit OTP.', 'Error');

      return;
    }

    const data = {
      userId: localStorage.getItem('USERID'),
      email: this.email,
      otp: this.otp,
    };

    console.log('Verifying OTP with data:', data);

    this.http
      .post(this.apiURL + '/verify-email-otp', data, this.httpOptions)
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response.status === true) {
            this.notify.notify(
              response.message || 'Email verified successfully.',
              'Success',
            );

            this.router.navigate(['/agent/first-time-recharge']);
          } else {
            this.otpError = response.message || 'Invalid OTP.';

            this.notify.notify(this.otpError, 'Error');
          }
        },
        (error) => {
          console.error('Verify email error:', error);

          if (error.error && error.error.message) {
            this.otpError = error.error.message;

            this.notify.notify(error.error.message, 'Error');
          } else {
            this.notify.notify(
              'Something went wrong. Please try again.',
              'Error',
            );
          }
        },
      );
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }

  editEmail() {
    this.isEmailEditable = true;

    setTimeout(() => {
      this.emailInput.nativeElement.focus();
    });
  }
}
