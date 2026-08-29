import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firsttime-recharge',
  templateUrl: './firsttime-recharge.component.html',
  styleUrls: ['./firsttime-recharge.component.scss']
})
export class FirsttimeRechargeComponent implements OnInit {

  // Recharge amount
  rechargeAmount: number = 2000;

  // Optional remarks
  remarks: string = '';

  // Terms & Conditions
  termsAccepted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem('USERID'));
  }

  // Quick select amount
  addRechargeAmount(amount: number): void {
    this.rechargeAmount = amount;
  }

  // Close recharge modal
  closeWalletModal(): void {
    // Add your existing modal close logic here
  }

  // Make payment
  makePayment(): void {

    // Minimum recharge validation
    if (this.rechargeAmount < 2000) {
      alert('Minimum recharge amount is ₹2,000.');
      return;
    }

    // Terms validation
    if (!this.termsAccepted) {
      alert('Please accept the Terms & Conditions before making payment.');
      return;
    }

    console.log('Recharge Amount:', this.rechargeAmount);
    console.log('Remarks:', this.remarks);

    // Add your existing payment gateway logic here
  }

}