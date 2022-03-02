import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { WalletbalanceService } from '../../../../../services/walletbalance.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  username:any;
  user_id:any;
  //wallet_balance:any=0;

  public wallet_balance : Observable<number>;

  constructor(public router: Router,public balance: WalletbalanceService) { }

  ngOnInit() { 
    
    this.username=localStorage.getItem("USERNAME");
    this.user_id=localStorage.getItem("USERID");
    this.balance.getWalletBalance(this.user_id).subscribe(
      res=>{      
       if(res.status==1){
        if(res.data.length > 0){
          //this.wallet_balance= res.data[0].balance;   
          this.balance.setWalletBalance(res.data[0].balance); 
          this.wallet_balance = this.balance.WalletBalance(); 
        }else{
          this.balance.setWalletBalance(0); 
          this.wallet_balance = this.balance.WalletBalance(); 

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
