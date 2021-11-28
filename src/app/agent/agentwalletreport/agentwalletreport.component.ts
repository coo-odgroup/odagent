import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgentreportService } from '../../services/agentreport.service'
import { AgentWallet } from '../../model/agentwallet';
import { Constants } from '../../constant/constant';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-agentwalletreport',
  templateUrl: './agentwalletreport.component.html',
  styleUrls: ['./agentwalletreport.component.scss']
})
export class AgentwalletreportComponent implements OnInit {

  public form: FormGroup;

  public formConfirm: FormGroup;
  public searchForm: FormGroup;
  pagination: any;

  modalReference: NgbModalRef;
  confirmDialogReference: NgbModalRef;

  public isSubmit: boolean;
  public ModalHeading: any;
  public ModalBtn: any;

  wallet: AgentWallet[];
  walletRecord: AgentWallet;
  busoperators: any;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private fb: FormBuilder, 

    private ws: AgentreportService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {  }





  ngOnInit(): void {
    this.searchForm = this.fb.group({
      name: [null],
      rows_number: Constants.RecordLimit,
      user_id : localStorage.getItem('USERID'),
    });
    this.search();
  }


  OpenModal(content) {
    this.modalReference = this.modalService.open(content, { scrollable: true, size: 'xl' });
  }
  ResetAttributes() {
    this.walletRecord = {} as AgentWallet;
    this.form.reset();
    this.ModalHeading = "Enter Payment Details";
    this.ModalBtn = "Request";
  }



  page(label: any) {
    return label;
  }


  search(pageurl = "") {
    const data = {
      name: this.searchForm.value.name,
      bus_operator_id: this.searchForm.value.bus_operator_id,
      rows_number: this.searchForm.value.rows_number,
      user_id : localStorage.getItem('USERID')
    };

    // console.log(data);
    if (pageurl != "") {
      this.ws.agentwalletpaginationReport(pageurl, data).subscribe(
        res => {
          this.wallet = res.data.data.data;
          this.pagination = res.data.data;
        }
      );
    }
    else {
      this.ws.agentwalletReport(data).subscribe(
        res => {
          this.wallet = res.data.data.data;
          this.pagination = res.data.data;
        }
      );
    }
  }


  refresh() {
    this.searchForm = this.fb.group({
      name: [null],
      rows_number: Constants.RecordLimit,
      user_id : localStorage.getItem('USERID')
    });
    this.search();
  }

  title = 'angular-app';
  fileName = 'Seo-Setting.xlsx';

  exportexcel(): void {

    /* pass here the table id */
    let element = document.getElementById('print-section');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


  


}
