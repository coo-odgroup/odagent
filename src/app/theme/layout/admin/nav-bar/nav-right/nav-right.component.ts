import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { WalletbalanceService } from '../../../../../services/walletbalance.service';


@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  username:any;
  user_id:any;
  wallet_balance:any=0;
  constructor(public router: Router,public balance: WalletbalanceService) { }

  ngOnInit() { 
    
    this.username=localStorage.getItem("USERNAME");
    this.user_id=localStorage.getItem("USERID");
    this.balance.getWalletBalance(this.user_id).subscribe(
      res=>{

        console.log(res);
      
       if(res.status==1){
        if(res.data.length > 0){
          this.wallet_balance= res.data[0].balance;        
        }
       }
       
      });

    
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
