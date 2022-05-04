import { Component, OnInit, VERSION } from '@angular/core';
import { AgentreportService } from '../../services/agentreport.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { ManagebookingService } from '../../services/managebooking.service';
import { BusOperatorService } from './../../services/bus-operator.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompleteReport } from '../../model/completereport';
import { LocationService } from '../../services/location.service';
import { BusService } from '../../services/bus.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '../../constant/constant';
import * as XLSX from 'xlsx';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { WalletbalanceService } from '../../services/walletbalance.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-agentcompletereport',
  templateUrl: './agentcompletereport.component.html',
  styleUrls: ['./agentcompletereport.component.scss'],
  providers: [DatePipe]
})
export class AgentcompletereportComponent implements OnInit {

  public searchFrom: FormGroup;

  completeReport: CompleteReport[];
  completeReportRecord: CompleteReport;
  todayDate:any;
  completedata: any;
  totalfare = 0;
  busoperators: any;
  url: any;
  locations: any;
  buses: any;
  currentDate = new Date();
  qrCode:any='';
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  singleRecord: any;
  modalReference: NgbModalRef;
  confirmDialogReference: NgbModalRef;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrcode:any = '';

  cancelInfo:any=[];


  submitted = false;
  Otpsubmitted = false;
  ResendOtp :boolean=false;
  ResendTimer :boolean=true;
  Timer= 20;  
  alert:any='';

  public cancelForm: FormGroup;
  public FinalcancelForm: FormGroup;
  index: any;
  


  constructor(
    
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private rs: AgentreportService,   
    private notificationService: NotificationService,
    private busOperatorService: BusOperatorService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private busService: BusService,
    private calendar: NgbCalendar,
    private managebookingService: ManagebookingService,
    public balance: WalletbalanceService,
    public router: Router,
    public formatter: NgbDateParserFormatter,    
    private modalService: NgbModal,
    config: NgbModalConfig,
    private datePipe: DatePipe
  ) {
    
    this.todayDate =this.datePipe.transform((new Date), 'yyyy-MM-dd'); 
   


    config.backdrop = 'static';
    config.keyboard = false;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();

    this.cancelForm = this.fb.group({
      pnr: ['', Validators.required],
      mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

    this.FinalcancelForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }
  title = 'angular-app';
  fileName = 'Agent-Complete-Report.xlsx';
  ngOnInit(): void {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      bus_operator_id: [null],
      rangeFromDate: [null],
      rangeToDate: [null],
      payment_id: [null],
      date_type: ['booking'],
      rows_number: Constants.RecordLimit,
      source_id: [null],
      destination_id: [null]
    })


    this.search();
    this.loadServices();

  }

  exportexcel(): void {

    /* pass here the table id */
    let element = document.getElementById('export-section');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  page(label: any) {
    return label;
  }
  search(pageurl = "") {
    this.spinner.show();
    this.completeReportRecord = this.searchFrom.value;

    const data = {
      bus_operator_id: this.completeReportRecord.bus_operator_id,
      payment_id: this.completeReportRecord.payment_id,
      date_type: this.completeReportRecord.date_type,
      rows_number: this.completeReportRecord.rows_number,
      source_id: this.completeReportRecord.source_id,
      destination_id: this.completeReportRecord.destination_id,
      rangeFromDate: this.completeReportRecord.rangeFromDate,
      rangeToDate: this.completeReportRecord.rangeToDate,
      user_id: localStorage.getItem('USERID'),
    };
    // console.log(data);
    if (pageurl != "") {
      this.rs.completepaginationReport(pageurl, data).subscribe(
        res => {
          this.completedata = res.data;
          // console.log( this.completedata);
          this.spinner.hide();
        }
      );
    }
    else {
      this.rs.completeReport(data).subscribe(
        res => {
          this.completedata = res.data;
          // console.log( this.completedata);
          this.spinner.hide();
        }
      );
    }



  }




  ///////////////Function to Copy data to Clipboard/////////////////
  copyMessage($event: any) {
    // console.log($event);
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = $event;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  refresh() {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      bus_operator_id: [null],
      rangeFromDate: [null],
      rangeToDate: [null],
      payment_id: [null],
      date_type: ['booking'],
      rows_number: Constants.RecordLimit,
      source_id: [null],
      destination_id: [null]

    })
    this.search();
  }

  OpenModal(content) {
    this.modalReference = this.modalService.open(content, { scrollable: true, size: 'xl' });
  }

  OpenCancelModal(content,i){


    if(confirm("Are you sure want to cancel ? ")) {
    //console.log(i); 
    

    this.singleRecord=[];
    this.singleRecord=this.completedata.data.data[i];    
    this.index = i;
    //return;
    this.spinner.show();


  const data= {
    "pnr":this.singleRecord.pnr,
    "mobile":this.singleRecord.users.phone
   };
  //  console.log(data);

  this.managebookingService.AgentcancelTicketOTP(data).subscribe(
    res=>{
      if(res.status==1){
        if(typeof res.data ==='string'){

          this.notificationService.notify(res.data,"Error");

        }
        if(typeof res.data ==='object'){
          
          if(this.ResendOtp == false){
            //this.open(content);
            this.confirmDialogReference=this.modalService.open(content,{ scrollable: true, size: 'md' });
          }
          

          this.cancelInfo=res.data; 
          this.notificationService.notify('OTP has been sent',"Success");

        }              
      }

      if(res.status==0){
        this.notificationService.notify(res.message,"Error");
      }

      this.spinner.hide();
       

    },
  error => {
    this.spinner.hide();
    this.notificationService.notify(error.error.message,"Error");
  }
  );
}
    
  }

  OtpHandleEvent(event:any){    
    if(event.action === 'done'){
      this.ResendOtp=true;
      this.ResendTimer=false;
    }
  }

  get f() { return this.cancelForm.controls; }

  get fo() { return this.FinalcancelForm.controls; }


  onSubmitOtp(){
  //  console.log(this.FinalcancelForm.value);

    this.Otpsubmitted = true;
    // stop here if form is invalid
    if (this.FinalcancelForm.invalid) {      
     return;
    }else{  
      
     this.spinner.show();

      const request= {
        "pnr":this.singleRecord.pnr,
        "mobile":this.singleRecord.users.phone,
        "otp":this.FinalcancelForm.value.otp,
      };   
     // console.log(request);  
      this.managebookingService.AgentCancelTicket(request).subscribe(
       res=>{ 
         if(res.status==1){          
          this.notificationService.notify("Ticket is cancelled succesfully","Success");
          this.modalService.dismissAll();
          this.refresh();



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


          this.router.navigate(['agent/completereport']);



         } 
         if(res.status==0){
           this.notificationService.notify(res.message,"Error");
         } 

         this.spinner.hide();
       },
     error => {
       this.spinner.hide();
       this.notificationService.notify(error.error.message,"Error");
     });

    }

  }
  // openConfirmDialog(content,i){
  //   this.singleRecord=[];
  //   this.confirmDialogReference=this.modalService.open(content,{ scrollable: true, size: 'md' });
  //   // console.log(i);
  //   this.singleRecord=this.completedata.data.data[i];

  // }


  

  loadServices() {

    this.busOperatorService.readAll().subscribe(
      res => {
        this.busoperators = res.data;
      }
    );
    this.locationService.readAll().subscribe(
      records => {
        this.locations = records.data;
      }
    );
  }

  findSource(event: any) {
    let source_id = this.searchFrom.controls.source_id.value;
    let destination_id = this.searchFrom.controls.destination_id.value;


    if (source_id != "" && destination_id != "") {
      this.busService.findSource(source_id, destination_id).subscribe(
        res => {
          this.buses = res.data;
        }
      );
    }
    else {
      this.busService.all().subscribe(
        res => {
          this.buses = res.data;
        }
      );
    }
  }

  print_tkt(i)
  {
    // this.singleRecord=[];
    // console.log(this.singleRecord);
    this.singleRecord=this.completedata.data.data[i];

    //console.log(this.singleRecord);

    let conductor_no='';

    this.singleRecord.bus.bus_contacts.forEach(e => {

      if(e.type==2){
        conductor_no=e.phone;
      }
      
    });

    let seat=[];


    this.singleRecord.booking_detail.forEach(e => {

      seat.push(e.bus_seats.seats.seatText);
      
    });

    let seat_name= seat.join(',');

   // this.qrcode = "PNR - "+this.singleRecord.pnr+" , Customer Phone No- "+this.singleRecord.users.phone+", Conductor No- "+conductor_no+" , Bus Name- "+this.singleRecord.bus.name+", Bus No- "+this.singleRecord.bus.bus_number+" , Journey Date- "+this.singleRecord.journey_dt+", Bus Route- "+this.singleRecord.source[0][0].name+' -> '+this.singleRecord.destination[0][0].name+", Seat- "+seat_name;

   this.qrcode = Constants.CONSUMER_BASE_URL+"pnr/"+this.singleRecord.pnr;

  }

  emailSms(i)
  {    
    this.singleRecord=this.completedata.data.data[i];

    const data=
    {
        pnr:this.singleRecord.pnr,
        mobile:this.singleRecord.users.phone
    }

    if(confirm("Are you sure want to resend Email and Message ? ")) {
      this.spinner.show();
      this.rs.emailSms(data).subscribe(
        res => {
          this.notificationService.addToast({ title: 'Success', msg: res.data, type: 'success' });
          this.spinner.hide();
        }
      );
    }
  }

  // cancelTkt(i)
  // {
  //   this.singleRecord=this.completedata.data.data[i];
  //   console.log(this.singleRecord);
  // }
}