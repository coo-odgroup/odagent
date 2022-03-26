import { Component, OnInit } from '@angular/core';
import { AgentreportService } from '../../services/agentreport.service' ;
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusOperatorService } from './../../services/bus-operator.service';
import { LocationService } from '../../services/location.service';
import { BusService} from '../../services/bus.service';
import {CancelTicketsReport } from '../../model/cancelticketsreports';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Constants} from '../../constant/constant' ;
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-agentticketcancellationreport',
  templateUrl: './agentticketcancellationreport.component.html',
  styleUrls: ['./agentticketcancellationreport.component.scss']
})
export class AgentticketcancellationreportComponent implements OnInit {

 
  public searchFrom: FormGroup;

  cancelTicketsReport: CancelTicketsReport[];
  cancelTicketsReportRecord: CancelTicketsReport;

  cancelticketdata: any;
  busoperators: any;
  locations: any;
  buses: any;
  // completedata: any;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  constructor(
    private spinner: NgxSpinnerService ,
     private http: HttpClient ,
     private fb: FormBuilder,
     private locationService:LocationService,
     private busService:BusService, 
     private rs:AgentreportService,
     private busOperatorService: BusOperatorService ,
     private calendar: NgbCalendar, 
     public formatter: NgbDateParserFormatter 
    ) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getToday();
     }

     title = 'angular-app';
     fileName= 'Cancel-Ticket-Report.xlsx';

  ngOnInit(): void {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      bus_operator_id: [null],
      payment_id : [null],
      date_type:['booking'],
      rows_number: Constants.RecordLimit,
      source_id:[null],
      destination_id:[null],
      rangeFromDate:[null],
      rangeToDate :[null]

    })  
    this.search(); 
    this.loadServices();
  }
  
  page(label:any){
    return label;
   }
  search(pageurl="")
  {this.spinner.show();
     this.cancelTicketsReportRecord = this.searchFrom.value ; 
     
    const data = {
      bus_operator_id: this.cancelTicketsReportRecord.bus_operator_id,
      payment_id:this.cancelTicketsReportRecord.payment_id,
      date_type :this.cancelTicketsReportRecord.date_type,
      rows_number:this.cancelTicketsReportRecord.rows_number,
      source_id:this.cancelTicketsReportRecord.source_id,
      destination_id:this.cancelTicketsReportRecord.destination_id,
      rangeFromDate:this.cancelTicketsReportRecord.rangeFromDate,
      rangeToDate :this.cancelTicketsReportRecord.rangeToDate,
      user_id : localStorage.getItem('USERID'),               
    };

    if(pageurl!="")
    {
      this.rs.cancelticketpaginationReport(pageurl,data).subscribe(
        res => {
          this.cancelticketdata= res.data;
          this.spinner.hide();
        }
      );
    }
    else
    {
      this.rs.cancelticketReport(data).subscribe(
        res => {
          this.cancelticketdata= res.data;
          this.spinner.hide();
        }
      );
    }


    
  }


  exportexcel(): void
  {
    
    /* pass here the table id */
    let element = document.getElementById('print-section');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  refresh()
  {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      bus_operator_id: [null],
      payment_id : [null],
      date_type:['booking'],
      rows_number: Constants.RecordLimit,
      source_id:[null],
      destination_id:[null],
      rangeFromDate:[null],
      rangeToDate :[null]

    })  
    this.loadServices();
    this.search();
  }


  
  loadServices() {

    this.busOperatorService.readAll().subscribe(
      res => {
        this.busoperators = res.data;
      }
    );
    this.locationService.readAll().subscribe(
      records=>{
        this.locations=records.data;
      }
    );
  }

  findSource(event:any)
  {
    let source_id=this.searchFrom.controls.source_id.value;
    let destination_id=this.searchFrom.controls.destination_id.value;
  
  
    if(source_id!="" && destination_id!="")
    {
      this.busService.findSource(source_id,destination_id).subscribe(
        res=>{
          this.buses=res.data;
        }
      );
    }
    else
    {
      this.busService.all().subscribe(
        res=>{
          this.buses=res.data;
        }
      );
    }
  }


  


}
