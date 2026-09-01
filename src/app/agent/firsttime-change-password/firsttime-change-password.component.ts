import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../constant/constant';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-firsttime-change-password',
  templateUrl: './firsttime-change-password.component.html',
  styleUrls: ['./firsttime-change-password.component.scss'],
})
export class FirsttimeChangePasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';

  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private router: Router, private http: HttpClient, private notify: NotificationService) {}

  private apiURL = Constants.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  ngOnInit(): void {}

  closePasswordModal(): void {
    // Add your existing modal close logic here
  }

  changePassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      alert('Password or confirm password missing.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Password and confirm password do not match.');
      return;
    }

    const data = {
      userId: localStorage.getItem('USERID'),
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    console.log('New Password:', this.newPassword);

    this.http.post(this.apiURL + '/change-first-password', data).subscribe(
      (response: any) => {

        console.log(response);

        if (response.status === true) {
          this.notify.notify(response.message, 'Success');

          this.logout()
          this.router.navigate(['/login']);
        } else {
          this.notify.notify(response.message, 'Error');
        }
      },
      (error) => {

        console.error('Change password error:', error);

        if (error.error && error.error.message) {
          this.notify.notify(error.error.message, 'Error');
        } else {
          this.notify.notify('Something went wrong. Please try again.', 'Error');

        }
      },
    );
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
