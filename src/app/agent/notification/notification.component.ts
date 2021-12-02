import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; 
import { Agentnotification } from '../../model/agentnotification';
import {AgentnotificationService } from '../../services/agentnotification.service';
import {Constants} from '../../constant/constant' ;
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {


  public formConfirm: FormGroup;
  public searchFrom: FormGroup;
  modalReference: NgbModalRef;
  confirmDialogReference: NgbModalRef;

   public isSubmit: boolean;
  public ModalHeading:any;
  public ModalBtn:any;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  notificationcontent: Agentnotification[];
  notificationcontentRecord: Agentnotification;
  pagination: any;
  busoperators: any;

  constructor(
    private spinner: NgxSpinnerService ,
    private http: HttpClient, 
    private fb: FormBuilder,
    private ans: AgentnotificationService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter
    )
    { 
      config.backdrop = 'static';
      config.keyboard = false;
      this.ModalHeading = "View Details";
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getToday();
    }   
    

  ngOnInit(): void {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      rows_number: Constants.RecordLimit,
      rangeFromDate:[null],
      rangeToDate:[null]    
    })

    this.search();
  }
  
  OpenModal(content) 
  {
    this.modalReference=this.modalService.open(content,{ scrollable: true, size: 'lg' });
  }

  page(label:any){
    return label;
   }
   search(pageurl="")
  {      this.spinner.show();
    const data = {
      rows_number:this.searchFrom.value.rows_number,  
      rangeFromDate:this.searchFrom.value.rangeFromDate,
      rangeToDate :this.searchFrom.value.rangeToDate,
      user_id : localStorage.getItem('USERID'),
    };
   
    if(pageurl!="")
    {
      this.ans.notificationpaginationReport(pageurl,data).subscribe(
        res => {
          this.notificationcontent= res.data.data.data;
          this.pagination= res.data.data;
          this.spinner.hide();
        }
      );
    }
    else
    {
      this.ans.notificationReport(data).subscribe(
        res => {
          this.notificationcontent= res.data.data.data;
          this.pagination= res.data.data;
          // console.log(res.data.data);
          this.spinner.hide();
        }
      );
    }
  }

  refresh()
  {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      rows_number: Constants.RecordLimit,
      rangeFromDate:[null],
      rangeToDate:[null]    
    });
    this.search();
  }

  viewDetails(index)
  {
    this.notificationcontentRecord = this.notificationcontent[index];
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.searchFrom.controls.rangeFromDate.setValue(date);
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.searchFrom.controls.rangeToDate.setValue(date);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.searchFrom.controls.rangeFromDate.setValue(date);
    }
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


}
