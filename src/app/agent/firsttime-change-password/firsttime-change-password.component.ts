import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firsttime-change-password',
  templateUrl: './firsttime-change-password.component.html',
  styleUrls: ['./firsttime-change-password.component.scss']
})
export class FirsttimeChangePasswordComponent implements OnInit {

  newPassword: string = '';
  confirmPassword: string = '';

  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closePasswordModal(): void {
    // Add your existing modal close logic here
  }

  changePassword(): void {

    if (!this.newPassword || !this.confirmPassword) {
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      return;
    }

    console.log('New Password:', this.newPassword);

    // Add your API/change-password logic here
  }

}