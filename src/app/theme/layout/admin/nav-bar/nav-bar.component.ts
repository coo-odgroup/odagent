import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NextConfig } from '../../../../app-config';
import { WalletbalanceService } from 'src/app/services/walletbalance.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public flatConfig: any;
  public menuClass: boolean;
  public collapseStyle: string;
  public windowWidth: number;

  public isStaticMenuOpen = false;
  public isReportOpen = false;

  public mobileMenus = [
    {
      icon: 'fa-ticket',
      label: 'Book Ticket',
      route: '/agent/booking',
    },
    {
      icon: 'fa-list',
      label: 'All Transactions',
      route: '/agent/alltransactionreport',
    },
    {
      icon: 'fa-file',
      label: 'Complete Report',
      route: '/agent/completereport',
    },
  ];

  public menuItems = [
    {
      icon: 'fa-home',
      label: 'Dashboard',
      route: '/dashboard/landing',
    },
    {
      icon: 'fa-wallet',
      label: 'Wallet Request',
      route: '/agent/wallet',
    },
    {
      icon: 'fa-percent',
      label: 'Commission Slab',
      route: '/agent/commissionslab',
    },
    {
      icon: 'fa-users',
      label: 'Customer Commission Slab',
      route: '/agent/customercommissionslab',
    },
    {
      icon: 'fa-bell',
      label: 'Notification',
      route: '/agent/notification',
    },
    {
      icon: 'fa-user',
      label: 'My Profile',
      route: '/agent/agentprofile',
    },
  ];

  public reportItems = [
    {
      icon: 'fa-percent',
      label: 'Cancellation Report',
      route: '/agent/cancellationreport',
    },
    {
      icon: 'fa-percent',
      label: 'Commission Report',
      route: '/agent/commissionreport',
    },
  ];

  @Output() onNavCollapse = new EventEmitter();
  @Output() onNavHeaderMobCollapse = new EventEmitter();

  constructor(
    public router: Router,
    public balance: WalletbalanceService,
  ) {
    this.flatConfig = NextConfig.config;
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  username: any;
  user_id: any;
  //wallet_balance:any=0;

  public wallet_balance: Observable<number>;

  ngOnInit() {
    this.username = localStorage.getItem('USERNAME');
    this.user_id = localStorage.getItem('USERID');
    this.balance.getWalletBalance(this.user_id).subscribe((res) => {
      if (res.status == 1) {
        if (res.data.length > 0) {
          //this.wallet_balance= res.data[0].balance;
          this.balance.setWalletBalance(res.data[0].balance);
          this.wallet_balance = this.balance.WalletBalance();
        } else {
          this.balance.setWalletBalance(0);
          this.wallet_balance = this.balance.WalletBalance();
        }
      }
    });
  }

  showSupport = false;

  toggleSupport() {
    this.showSupport = !this.showSupport;
  }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = this.menuClass ? 'block' : 'none';
  }

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.onNavCollapse.emit();
    } else {
      this.onNavHeaderMobCollapse.emit();
    }
  }

  goTo(route: string) {
    this.router.navigate([route]);
    this.isStaticMenuOpen = false;
  }

  toggleStaticMenu() {
    this.isStaticMenuOpen = !this.isStaticMenuOpen;
  }

  toggleReport() {
    this.isReportOpen = !this.isReportOpen;
  }

    logout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
