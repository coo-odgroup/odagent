import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Constants } from './constant/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient,
  ) {
    this.auth.getToken().subscribe((res) => {
      localStorage.setItem('APIAccessToken', res.data);
    });
  }

  private apiURL = Constants.BASE_URL;

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkUserStatus();
      });

    // Initial page load
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    const userId = localStorage.getItem('USERID');

    // User is not logged in
    if (!userId) {
      return;
    }

    // Don't check these pages
    const currentUrl = this.router.url;

    if (
      currentUrl === '/login' ||
      currentUrl === '/signup'
    ) {
      return;
    }

    const data = {
      USERID: userId,
    };

    this.http.post(this.apiURL + '/getUserStatus', data).subscribe(
      (res: any) => {
        if (res.status !== 1) {
          return;
        }

        const user = res.data;

        // console.log(user);

        // 1. Password
        if (Number(user.is_password_changed) === 0) {
          this.router.navigate(['/agent/first-change-password']);
          return;
        }

        // 2. Email
        // if (Number(user.is_email_verified) === 0) {
        //   this.router.navigate(['/agent/verify-email']);
        //   return;
        // }

        // 3. First recharge
        if (Number(user.is_first_recharge_done) === 0) {
          this.router.navigate(['/agent/first-time-recharge']);
          return;
        }

        // All completed
        // User can access the requested page
      },
      (error) => {
        console.error('User status API error:', error);
      },
    );
  }
}
