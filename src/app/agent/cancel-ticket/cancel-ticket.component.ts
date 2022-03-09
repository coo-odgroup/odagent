import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ManagebookingService } from '../../services/managebooking.service';
import {Constants} from '../../constant/constant' ;
import { NotificationService } from '../../services/notification.service';
import { NgbDatepickerConfig,NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { WalletbalanceService } from '../../services/walletbalance.service';





@Component({
  selector: 'app-cancel-ticket',
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.scss'],
  providers: [NgbActiveModal]

})
export class CancelTicketComponent implements OnInit {

  public cancelForm: FormGroup;
  public FinalcancelForm: FormGroup;
  
  submitted = false;
  Otpsubmitted = false;

  bookingDetails:any;

  seats:any=[];
  totalseats:any=[];

  
  cancelInfo:any=[];

  
  ResendOtp :boolean=false;
  ResendTimer :boolean=true;
  Timer= 20;  
  alert:any='';

    
    constructor( public fb: FormBuilder,public router: Router,private spinner: NgxSpinnerService,private managebookingService: ManagebookingService, private notify: NotificationService,public activeModal: NgbActiveModal,private modalService: NgbModal,public balance: WalletbalanceService) { 

    this.cancelForm = this.fb.group({
      pnr: ['', Validators.required],
      mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

    this.FinalcancelForm = this.fb.group({
      otp: ['', Validators.required],
    });

  }



  OtpHandleEvent(event:any){    
    if(event.action === 'done'){
      this.ResendOtp=true;
      this.ResendTimer=false;
    }
  }

  get f() { return this.cancelForm.controls; }

  get fo() { return this.FinalcancelForm.controls; }

    
  onSubmit() {   

    this.bookingDetails= null;
    this.submitted = true;
     // stop here if form is invalid
     if (this.cancelForm.invalid) {      
      return;
     }else{  

      this.spinner.show();

       const request= {
        "pnr":this.cancelForm.value.pnr,
        "mobile":this.cancelForm.value.mobile
       };  

       console.log(request);

       this.managebookingService.getbookingdetails(request).subscribe(
        res=>{ 

         
          
          if(res.status==1){
            
            this.bookingDetails=res.data[0];  

            for(let i=0;i< this.bookingDetails.booking[0].booking_detail.length ;i++){
              this.seats.push(this.bookingDetails.booking[0].booking_detail[i].bus_seats.seats.seatText);            
            }
            this.totalseats  = this.seats.length;

          } 
          if(res.status==0){
            this.notify.notify(res.message,"Error");
          } 

          this.spinner.hide();
        },
      error => {

        console.log(error);
        this.spinner.hide();
        this.notify.notify(error.error.message,"Error");
      });

     }
  }

  onSubmitOtp(){

    this.Otpsubmitted = true;
    // stop here if form is invalid
    if (this.FinalcancelForm.invalid) {      
     return;
    }else{  

     this.spinner.show();

      const request= {
       "pnr":this.cancelForm.value.pnr,
       "mobile":this.cancelForm.value.mobile,
       "otp":this.FinalcancelForm.value.otp,
      };     
      this.managebookingService.AgentCancelTicket(request).subscribe(
       res=>{ 
         if(res.status==1){          
          this.notify.notify("Ticket is cancelled succesfully","Success");
          this.modalService.dismissAll();


          let user_id=localStorage.getItem("USERID");
          this.balance.getWalletBalance(user_id).subscribe(
            res=>{      
             if(res.status==1){
              if(res.data.length > 0){
                this.balance.setWalletBalance(res.data[0].balance); 
              }else{
                this.balance.setWalletBalance(0); 
              }
             }
             
            });


          this.router.navigate(['agent/cancellationreport']);



         } 
         if(res.status==0){
           this.notify.notify(res.message,"Error");
         } 

         this.spinner.hide();
       },
     error => {
       this.spinner.hide();
       this.notify.notify(error.error.message,"Error");
     });

    }

  }

  onlyNumbers(event:any) {
    var e = event ;
    var charCode = e.which || e.keyCode;
   
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || charCode ==8 || charCode==9)
        return true;
        return false;        
}


cancelTicketTab(content:any) {   

  this.spinner.show();


  const request= {
    "pnr":this.cancelForm.value.pnr,
    "mobile":this.cancelForm.value.mobile
   };

  this.managebookingService.AgentcancelTicketOTP(request).subscribe(
    res=>{

     // console.log(res);

      if(res.status==1){
        if(typeof res.data ==='string'){

          this.notify.notify(res.data,"Error");

        }
        if(typeof res.data ==='object'){
          if(this.ResendOtp == false){
            this.open(content);
            
          }
          

          this.cancelInfo=res.data; 
          this.notify.notify('OTP has been sent',"Success");

        }              
      }

      if(res.status==0){
        this.notify.notify(res.message,"Error");
      }

      this.spinner.hide();
       

    },
  error => {
    this.spinner.hide();
    this.notify.notify(error.error.message,"Error");
  }
  );
}

open(content:any) {
  this.modalService.open(content);
}

  ngOnInit(): void {
  }

}
