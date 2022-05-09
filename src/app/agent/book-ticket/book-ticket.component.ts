import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { GenderCheck } from '../../helpers/gender-check';
import { DatePipe } from '@angular/common';
import { AgentBookTicketService } from '../../services/agent-book-ticket.service';
import { AgentPaymentService } from '../../services/agent-payment.service';
import { AgentPaymentStatusService } from '../../services/agent-payment-status.service';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { WalletbalanceService } from '../../services/walletbalance.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Constants } from '../../constant/constant';




declare let Razorpay: any;
@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss'],
  providers: [DatePipe]
})
export class BookTicketComponent implements OnInit {

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
 
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };

  genderArr:any=[];

   Timer= 420;
   public bookForm1: FormGroup;
   public bookForm2: FormGroup;
   public bookForm3: FormGroup;
   public couponForm: FormGroup;

   submitted1=false;
   submitted2=false;
   couponSubmitted=false;

   bookingDate:any;

   bookingdata: any;
   busRecord: any;
   genderRestrictSeats: any;

   passengerData: any=[];

   bookTicketResponse :any=[];
   MakePaymnetResponse :any=[];


   elementType = NgxQrcodeElementTypes.URL;
   correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
   qrcode:any = '';

   source:any;
   destination:any;
   source_id:any;
   destination_id:any;
   entdate:any;
   formatentdate:any;

   payableAmount:any=0;

   razorpayResponse: any;
   response: any;
   tabclick :any = true;

   customerInfoname:any=null;
   customerInfoEmail:any=null;
   customerInfoPhone:any=null;

   isnameReadOnly:boolean=false;
   isphoneReadOnly:boolean=false;
   ismailReadOnly:boolean=false;

   total_seat_name:any=[];
   seat_ids:any=[];
   lb_seats:any=[];
   ub_seats:any=[];
   loadingText: string = 'Loading...';

   created_by = localStorage.getItem('USERNAME');

   agent:any;
   applied_comission:number=0;
   commissionError:Boolean=false;
   USERRECORDS:any=[];


  constructor(private ngWizardService: NgWizardService,private fb : FormBuilder,private spinner: NgxSpinnerService ,
    private router: Router,
    private notify: NotificationService,
    private datePipe: DatePipe,
    private agentBookTicketService: AgentBookTicketService,
    private agentPaymentService: AgentPaymentService,
    private agentPaymentStatusService: AgentPaymentStatusService,
    public balance: WalletbalanceService
    ) {    

    this.source=localStorage.getItem('source');
    this.destination=localStorage.getItem('destination');   
    const entdt:any =localStorage.getItem('entdate'); 

    this.entdate = this.showformattedDate(entdt);

    this.source_id=localStorage.getItem('source_id');
    this.destination_id=localStorage.getItem('destination_id');


    this.genderArr=[
      {
        'name' : 'Male',
        'value' : 'M'
      },
      {
        'name' : 'Female',
        'value' : 'F'
      },
      {
        'name' : 'Other',
        'value' : 'O'
      }
    ];

    this.bookingdata=localStorage.getItem('bookingdata');
    this.busRecord=localStorage.getItem('busRecord');
    this.genderRestrictSeats=localStorage.getItem('genderRestrictSeats');
    this.USERRECORDS=localStorage.getItem('USERRECORDS');

    if(this.bookingdata == null && this.busRecord == null){
     this.router.navigate(['agent/booking']);
    }else{
      this.bookingdata= JSON.parse(this.bookingdata);
      this.USERRECORDS= JSON.parse(this.USERRECORDS);

      this.busRecord= JSON.parse(this.busRecord);

      this.genderRestrictSeats= JSON.parse(this.genderRestrictSeats);

      let brdTm_arr = this.bookingdata.boardingPoint.split(" | ");
      let drpTm_arr = this.bookingdata.droppingPoint.split(" | ");

      this.bookingdata.boardingPoint=brdTm_arr[0];
      this.bookingdata.droppingPoint=drpTm_arr[0];
      this.busRecord.departureTime=brdTm_arr[1];
      this.busRecord.arrivalTime=drpTm_arr[1]; 


      if(this.bookingdata.UpperBerthSeats.length){
        this.total_seat_name =this.total_seat_name.concat(this.bookingdata.UpperBerthSeats);
        this.ub_seats = this.ub_seats.concat(this.bookingdata.UpperBerthSeats);

      } 

      if(this.bookingdata.LowerBerthSeats.length){
        this.total_seat_name =this.total_seat_name.concat(this.bookingdata.LowerBerthSeats);
        this.lb_seats = this.lb_seats.concat(this.bookingdata.LowerBerthSeats);
      }
      
      

      if(this.bookingdata.Upperberth.length){
        this.seat_ids =this.seat_ids.concat(this.bookingdata.Upperberth);
      }

      if(this.bookingdata.Lowerberth.length){
        this.seat_ids =this.seat_ids.concat(this.bookingdata.Lowerberth);
      }


      this.payableAmount=this.bookingdata.PriceArray.totalFare;
      
    }

    this.bookForm2 = this.fb.group({
      tnc:[true, Validators.requiredTrue]
    });


    this.bookForm3 = this.fb.group({});

        this.bookForm1 = this.fb.group({

          agentInfo: this.fb.group({          
            email: this.USERRECORDS.email,
            phone: this.USERRECORDS.phone,  
            name:this.USERRECORDS.name,
          }),  
          customerInfo: this.fb.group({          
            email: [this.USERRECORDS.email, [Validators.email,Validators.required]],
            phone: [this.USERRECORDS.phone, [Validators.required,Validators.pattern("^[0-9]{10}$")]],  
            name:[this.USERRECORDS.name, [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
          }),   
          bookingInfo: this.fb.group({ 
            bus_id: this.busRecord.busId,
            source_id: this.source_id,
            destination_id: this.destination_id,
            journey_dt: this.entdate,
            boarding_point: this.bookingdata.boardingPoint,
            dropping_point: this.bookingdata.droppingPoint,
            boarding_time: this.busRecord.departureTime,
            dropping_time: this.busRecord.arrivalTime,
            origin: "ODBUS",
            app_type: "AGENT",
            typ_id: "1",
            total_fare: this.bookingdata.PriceArray.totalFare,
            specialFare: this.bookingdata.PriceArray.specialFare,
            addOwnerFare:this.bookingdata.PriceArray.addOwnerFare,
            festiveFare:this.bookingdata.PriceArray.festiveFare,
            owner_fare: this.bookingdata.PriceArray.ownerFare,
            transactionFee: this.bookingdata.PriceArray.transactionFee,
            odbus_service_Charges: this.bookingdata.PriceArray.odbusServiceCharges,
            created_by: this.created_by,
            bookingDetail: this.fb.array([]),        
          })
        });
  
    


    const bookingInfo = this.bookForm1.controls["bookingInfo"] as FormGroup;
    const passengerList = bookingInfo.get('bookingDetail') as FormArray;
    
      for(let i=0;i< this.bookingdata.Upperberth.length ;i++){
        let seat= this.bookingdata.Upperberth[i];
         passengerList.push(this.createItem(seat,this.busRecord.sleeperPrice)); 
      }

      for(let i=0;i< this.bookingdata.Lowerberth.length ;i++){
        let seat= this.bookingdata.Lowerberth[i];
         passengerList.push(this.createItem(seat,this.busRecord.seaterPrice)); 
      }  


      this.couponForm = this.fb.group({
        coupon_code:[null, Validators.required]
      });
  
  }

  public tncStatus:boolean=true;

  public tncStatusChange(value:boolean){
      this.tncStatus = value;
  }

  onlyNumbers(event:any) {
    var e = event ;
    var charCode = e.which || e.keyCode;
   
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || charCode ==8 || charCode==9)
        return true;
        return false;        
}

get_seatno(seat_id:any){
  for(let i=0;i< this.bookingdata.Lowerberth.length ;i++){
    let seat= this.bookingdata.Lowerberth[i];
     if(seat==seat_id){
      return this.bookingdata.LowerBerthSeats[i]
     }
  }  

  for(let i=0;i< this.bookingdata.Upperberth.length ;i++){
    let seat= this.bookingdata.Upperberth[i];
    if(seat==seat_id){
      return this.bookingdata.UpperBerthSeats[i]
     }
  }
}

  showformattedDate(date:any){
    if(date){

      let dt = date.split("-");
    return dt[2]+'-'+dt[1]+'-'+dt[0];

    }
    

  }

   createItem(seat:any,fare:any): FormGroup{

    
   // console.log(this.genderRestrictSeats);

    return this.fb.group({
      bus_seats_id: [seat], 
      passenger_name: [null, [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]],
      passenger_gender: [null, Validators.required],
      passenger_age:  [null, [Validators.required,
        Validators.min(1),Validators.max(100)]],
      created_by: this.created_by
    },
    {
      validator: GenderCheck('passenger_gender','bus_seats_id', this.genderRestrictSeats)
    });
  }

  get passengerFormGroup() {
    const bookingInfo = this.bookForm1.controls["bookingInfo"] as FormGroup;
    const passengerList = bookingInfo.get('bookingDetail') as FormArray;    
    return passengerList;
  }

  getPassengerFormGroup(index:any): FormGroup {
    const bookingInfo = this.bookForm1.controls["bookingInfo"] as FormGroup;
    const passengerList = bookingInfo.get('bookingDetail') as FormArray;
    const formGroup = passengerList.controls[index] as FormGroup;
    return formGroup;
  }

  get f() {     
    return this.bookForm1.controls;
   }

   get GetcustomerInfo():FormGroup{

    const FormGroup = this.bookForm1.get('customerInfo') as FormGroup;
    //const FormControl = ele.controls[type] as FormControl;
   // console.log(FormGroup);
    return FormGroup;

   }


   setCommission(event:any){

    this.commissionError=false;

    this.payableAmount =this.bookingdata.PriceArray.totalFare;

    if(event.target.value!='' &&  event.target.value!=null){

    if(event.target.value <= this.bookTicketResponse.customer_comission){
      this.applied_comission=event.target.value;

      this.payableAmount = parseFloat(this.payableAmount) +  parseFloat(event.target.value);
      this.commissionError=false;
    }else{
      this.commissionError=true;
      return false;
    }
   } 
   }
  
  submitForm1(){
    this.submitted1=true;

    if (this.bookForm1.invalid) {
      return;
     }else{
      this.spinner.show();
      this.passengerData=this.bookForm1.value; 

      console.log( this.passengerData);

      this.agentBookTicketService.book(this.passengerData).subscribe(
          res=>{ 
          if(res.status==1){
            this.bookTicketResponse=res.data;
            this.showNextStep();
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

  }

  countdown:any;

  submitForm2(){

    this.submitted2=true;
    if (this.bookForm2.invalid) {
      return;
     }else{

     
     
      let pass_det=this.bookForm1.value.bookingInfo.bookingDetail;

      let gender:any=[];
      pass_det.forEach((e: any) => {
        gender.push(e.passenger_gender);
        
      });

      const entdt:any =localStorage.getItem('entdate'); 

      ///// call to make payment API to get RazorPayment Order ID and Total price   
      this.spinner.show();

      const paymentParam={   
        "user_id": this.bookTicketResponse.user_id,
        "user_name": this.created_by,        
        "busId" : this.busRecord.busId,
        "sourceId":this.source_id, 
        "destinationId":this.destination_id,
        "applied_comission":this.applied_comission,
        "transaction_id": this.bookTicketResponse.transaction_id,
        "seatIds":this.seat_ids,
        "entry_date":entdt
      }


      //console.log(JSON.stringify(paymentParam));
     

      this.agentPaymentService.paymentRequest(paymentParam).subscribe(
        res=>{
        
          if(res.status==1){

            if(res.data=='SEAT UN-AVAIL'){

              this.spinner.hide();

              this.notify.notify(res.message,"Error");

            }else{
          
            let bkdt = new Date();
            let bkdt_mnth = ("0" + (bkdt.getMonth() + 1)).slice(-2);
            let bkdt_day = ("0" + bkdt.getDate()).slice(-2);
            let booking_date= [bkdt_day, bkdt_mnth,bkdt.getFullYear()].join("-");

            this.bookingDate= [bkdt.getFullYear(),bkdt_mnth,bkdt_day].join("-");
        
            let j_date = new Date(this.entdate);
            let j_mnth = ("0" + (j_date.getMonth() + 1)).slice(-2);
            let j_day = ("0" + j_date.getDate()).slice(-2);
            let journey_date= [j_day,j_mnth,j_date.getFullYear()].join("-");
        
            const param=  {
              "transaction_id":this.bookTicketResponse.transaction_id,  
              "customer_comission":this.applied_comission 
            }

          //  console.log(JSON.stringify(param));
           // return;
         
            
            this.agentPaymentStatusService.getPaymentStatus(param).subscribe(
              res=>{
        
                if(res.status==1){ 


                  //this.qrcode ="PNR - "+this.bookTicketResponse.pnr+" , Customer Phone No- "+this.passengerData.customerInfo.phone+", Conductor No- "+this.busRecord.conductor_number+" , Bus Name- "+this.busRecord.busName+", Bus No- "+this.busRecord.busNumber+" , Journey Date- "+this.entdate+", Bus Route- "+this.source+' -> '+this.destination+", Seat- "+this.total_seat_name;

                  this.qrcode = Constants.CONSUMER_BASE_URL+"pnr/"+this.bookTicketResponse.pnr;
        
                  this.showNextStep();                 
                  this.tabclick = false;           
                 
                    localStorage.removeItem('bookingdata');
                    localStorage.removeItem('busRecord');
                    localStorage.removeItem('genderRestrictSeats');
                    localStorage.removeItem('source');
                    localStorage.removeItem('source_id');
                    localStorage.removeItem('destination');
                    localStorage.removeItem('destination_id');
                    localStorage.removeItem('entdate'); 

                   
                   let user_id=localStorage.getItem("USERID");
                    this.balance.getWalletBalance(user_id).subscribe(
                      res=>{      
                       if(res.status==1){
                        if(res.data.length > 0){
                          this.balance.setWalletBalance(res.data[0].balance); 
                        }
                        else{
                          this.balance.setWalletBalance(0); 
                        }
                       }
                       
                      });

                    this.spinner.hide();  
                }

                if(res.status==0){
                  this.notify.notify(res.message,"Error");
                  this.spinner.hide();  
                }

               
        
            });
            
            ////////////////  payment success ////////////

                
          }

         
          
          }else{

            this.spinner.hide();  
            this.notify.notify(res.message,"Error");
          } 

      });
     
  }

   }


 
  print(): void {
    var printButton = document.getElementById('print_btn');
    printButton.style.visibility = 'hidden';
    const printContents = document.getElementById('print-section').innerHTML;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
   
    popupWin.document.write(`
        <html>
            <head>
                <title>Print Page</title>
            </head>
            <body
                style="font-size: 14px;
                    font-family: 'Source Sans Pro', 'Helvetica Neue',
                    Helvetica, Arial, sans-serif;
                    color: #333";
                onload="document.execCommand('print');window.close()">${printContents}</body>
        </html>`
    );
    printButton.style.visibility = 'visible';
    popupWin.document.close();
  }  

  user :any=[];
  isSignedIn: boolean;

   myDate:any = new Date();
  ngOnInit() { 
    this.passengerData=this.bookForm1.value;
   
    const entdt:any =localStorage.getItem('entdate'); 

    this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
   
    if(moment(this.myDate) > moment(entdt)){     
      this.router.navigate(['agent/booking']);
    }
  }
 
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
    
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
 
  stepChanged(args: StepChangedArgs) {
    //console.log(args);
  }
 
  isValidTypeBoolean: boolean = true;
 
  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }
 
  isValidFunctionReturnsObservable(args: StepValidationArgs) {    
    return this.tabclick;
  }

}