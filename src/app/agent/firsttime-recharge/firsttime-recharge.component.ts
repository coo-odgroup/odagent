import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from './../../services/wallet.service';
import { NotificationService } from './../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from './../../constant/constant';

declare var Cashfree: any;

@Component({
  selector: 'app-firsttime-recharge',
  templateUrl: './firsttime-recharge.component.html',
  styleUrls: ['./firsttime-recharge.component.scss'],
})
export class FirsttimeRechargeComponent implements OnInit {
  // Recharge amount
  rechargeAmount: number = 2000;

  // Optional remarks
  remarks: string = '';

  // Terms & Conditions
  termsAccepted: boolean = false;

  // Cashfree payment mode
  paymentmode = Constants.PAYMENT_MODE;

  public userEmail: any = '';
  public userMobile: any = '';

  constructor(
    private router: Router,
    private ws: WalletService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    const USERRECORDS = localStorage.getItem('USERRECORDS');
    const user = JSON.parse(USERRECORDS || '{}');
    this.userEmail = user?.email || '';
    this.userMobile = user?.phone || '';
  }

  // Quick select amount
  addRechargeAmount(amount: number): void {
    this.rechargeAmount = amount;
  }

  // Close recharge modal and go to dashboard
  closeWalletModal(): void {
    this.router.navigate(['/dashboard/landing']);
  }

  // Make payment
  makePayment(): void {
    // Minimum recharge validation
    if (this.rechargeAmount < 2000) {
      this.notificationService.addToast({
        title: 'Error',
        msg: 'Minimum recharge amount is ₹2,000.',
        type: 'error',
      });

      return;
    }

    // Terms validation
    if (!this.termsAccepted) {
      this.notificationService.addToast({
        title: 'Error',
        msg: 'Please accept the Terms & Conditions before making payment.',
        type: 'error',
      });

      return;
    }

    this.spinner.show();

    const data = {
      amount: this.rechargeAmount,
      remarks: this.remarks,

      user_id: localStorage.getItem('USERID'),

      user_name: localStorage.getItem('USERNAME'),

      transaction_type: 'c',

      frontend_url: window.location.origin,
    };

    // console.log('First Recharge Payment Data:', data);

    this.ws.makeWalletPayment(data).subscribe(
      (resp: any) => {
        this.spinner.hide();

        if (resp.status == 1) {
          const cashfree = Cashfree({
            mode: this.paymentmode,
          });

          cashfree.checkout({
            paymentSessionId: resp.data.payment_session_id,

            redirectTarget: '_self',
          });
        } else {
          this.notificationService.addToast({
            title: 'Error',
            msg: resp.message || 'Unable to initiate payment.',
            type: 'error',
          });
        }
      },

      (error: any) => {
        this.spinner.hide();

        console.error('Payment Error:', error);

        this.notificationService.addToast({
          title: 'Error',
          msg: 'Something went wrong. Please try again.',
          type: 'error',
        });
      },
    );
  }
}
