import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-suspended',
  templateUrl: './account-suspended.component.html',
  styleUrls: ['./account-suspended.component.scss']
})
export class AccountSuspendedComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {

    // Clear your existing login/session data here
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/agent/login']);
  }

}