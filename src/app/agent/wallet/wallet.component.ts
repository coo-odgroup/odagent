import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WalletService } from '../../services/wallet.service'
import { AgentWallet } from '../../model/agentwallet';
import { Constants } from '../../constant/constant';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

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
    private spinner: NgxSpinnerService ,
    private http: HttpClient,
    private notificationService: NotificationService,
    private fb: FormBuilder, 

    private ws: WalletService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.ModalHeading = "Add New Location";
    this.ModalBtn = "Save";
  }





  ngOnInit(): void {

    this.spinner.show();
    this.form = this.fb.group({
      id: [null],
      transaction_id: [null, Validators.compose([Validators.required])],
      payment_via: [null, Validators.compose([Validators.required])],
      amount: [null],
      remarks: [null],
      user_id: localStorage.getItem('USERID'),
      user_name: localStorage.getItem('USERNAME')
    });
    this.formConfirm = this.fb.group({
      id: [null]
    });
    this.searchForm = this.fb.group({
      bus_operator_id: [null],
      name: [null],
      payment_via: [null],
      rows_number: Constants.RecordLimit,
    });

    this.search();

  }


  OpenModal(content) {
    this.modalReference = this.modalService.open(content, { scrollable: true, size: 'xl' });
  }
  ResetAttributes() {
    this.walletRecord = {} as AgentWallet;
    this.form = this.fb.group({
      id: [null],
      transaction_id: [null, Validators.compose([Validators.required])],
      reference_id: [null],
      payment_via: [null, Validators.compose([Validators.required])],
      amount:  [null, Validators.compose([Validators.required,Validators.min(2000),Validators.required,Validators.max(49000)])],
      remarks: [null], 
      user_id: localStorage.getItem('USERID'),
      user_name: localStorage.getItem('USERNAME')
    });
    this.form.reset();
    this.ModalHeading = "Enter Payment Details";
    this.ModalBtn = "Request";
  }
  


  page(label: any) {
    return label;
  }


  search(pageurl = "") {
    this.spinner.show();
    const data = {
      name: this.searchForm.value.name,
      payment_via: this.searchForm.value.payment_via,
      rows_number: this.searchForm.value.rows_number,
      user_id : localStorage.getItem('USERID'),
    };

    // console.log(data);
    if (pageurl != "") {
      this.ws.getAllaginationData(pageurl, data).subscribe(
        res => {
          this.wallet = res.data.data.data;
          this.pagination = res.data.data;
          // console.log( this.BusOperators);
          this.spinner.hide();
        }
      );
    }
    else {
      this.ws.getAllData(data).subscribe(
        res => {
          this.wallet = res.data.data.data;
          this.pagination = res.data.data;
          // console.log( res.data);
          this.spinner.hide();
        }
      );
    }
  }


  refresh() {
    this.spinner.show();
    this.searchForm = this.fb.group({
      name: [null],
      payment_via: [null],
      rows_number: Constants.RecordLimit,
      user_id : localStorage.getItem('USERID'),
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


  addData() {
    this.spinner.show();
    const data = {
      transaction_id: this.form.value.transaction_id,
      reference_id: this.form.value.reference_id,
      payment_via:this.form.value.payment_via,
      amount: this.form.value.amount,
      remarks: this.form.value.remarks,
      user_id: localStorage.getItem('USERID'),
      user_name: localStorage.getItem('USERNAME'),
      transaction_type: "c",
    };
    // console.log(data);
   
      this.ws.create(data).subscribe(
        resp => {

          if (resp.status == 1) {
            this.notificationService.addToast({ title: 'Success', msg: resp.message, type: 'success' });
            this.modalReference.close();
            this.ResetAttributes();
            this.refresh();
          }
          else {
            this.notificationService.addToast({ title: 'Error', msg: resp.message, type: 'error' });
            this.spinner.hide();
          }
        }
      );   

  }

}
