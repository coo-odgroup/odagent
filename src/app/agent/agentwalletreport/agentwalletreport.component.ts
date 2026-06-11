import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { AgentreportService } from '../../services/agentreport.service';
import { AgentWallet } from '../../model/agentwallet';
import { Constants } from '../../constant/constant';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agentwalletreport',
  templateUrl: './agentwalletreport.component.html',
  styleUrls: ['./agentwalletreport.component.scss'],
})
export class AgentwalletreportComponent implements OnInit {
  public form: FormGroup;

  public formConfirm: FormGroup;
  public searchForm: FormGroup;
  pagination: any;

  minDate: string;
  maxDate: string;

  modalReference: NgbModalRef;
  confirmDialogReference: NgbModalRef;

  public isSubmit: boolean;
  public ModalHeading: any;
  public ModalBtn: any;

  wallet: AgentWallet[];
  walletRecord: AgentWallet;
  busoperators: any;

  totalCredits = 0;
  totalDebits = 0;
  animatedCredits = 0;
  animatedDebits = 0;
  animatedBalance = 0;

  mobileFilterOpen = false;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private fb: FormBuilder,

    private ws: AgentreportService,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) {}

  ngOnInit(): void {
    const today = new Date();

    this.maxDate = today.toISOString().split('T')[0];

    const oldDate = new Date();
    oldDate.setDate(today.getDate() - 180);

    this.minDate = oldDate.toISOString().split('T')[0];

    this.spinner.show();

    this.searchForm = this.fb.group({
      name: [null],
      rows_number: Constants.RecordLimit,
      user_id: localStorage.getItem('USERID'),
      tran_type: [''],
      SelectType: [''],
      from_date: [null],
      to_date: [null],
    });

    this.search();
  }

  calculateSummary() {
    this.totalCredits = 0;
    this.totalDebits = 0;

    if (!this.wallet || this.wallet.length === 0) {
      return;
    }

    this.wallet.forEach((row: any) => {
      const amount = Number(row.amount || 0);

      if (row.transaction_type === 'c') {
        this.totalCredits += amount;
      }

      if (row.transaction_type === 'd') {
        this.totalDebits += amount;
      }
    });

    const balance =
      this.wallet && this.wallet.length
        ? Number(this.wallet[0]['balance'] || 0)
        : 0;

    this.animateValue(
      0,
      this.totalCredits,
      1000,
      (val) => (this.animatedCredits = val),
    );

    this.animateValue(
      0,
      this.totalDebits,
      1000,
      (val) => (this.animatedDebits = val),
    );

    this.animateValue(0, balance, 1000, (val) => (this.animatedBalance = val));
  }

  OpenModal(content) {
    this.modalReference = this.modalService.open(content, {
      scrollable: true,
      size: 'xl',
    });
  }
  ResetAttributes() {
    this.walletRecord = {} as AgentWallet;
    this.form.reset();
    this.ModalHeading = 'Enter Payment Details';
    this.ModalBtn = 'Request';
  }

  page(label: any) {
    return label;
  }

  search(pageurl = '') {
    this.spinner.show();
    // console.log('Rows:', this.searchForm.value.rows_number);

    const data = {
      name: this.searchForm.value.name,
      bus_operator_id: this.searchForm.value.bus_operator_id,
      rows_number: this.searchForm.value.rows_number,
      user_id: localStorage.getItem('USERID'),
      tran_type: this.searchForm.value.tran_type,
      SelectType: this.searchForm.value.SelectType,
      from_date: this.searchForm.value.from_date,
      to_date: this.searchForm.value.to_date,
    };

    if (pageurl != '') {
      this.ws.agentwalletpaginationReport(pageurl, data).subscribe((res) => {
        this.wallet = res.data.data.data;
        this.pagination = res.data.data;
        this.calculateSummary();
        this.spinner.hide();
      });
    } else {
      this.ws.agentwalletReport(data).subscribe((res) => {
        console.log('Pagination Response:', res.data.data);
        this.wallet = res.data.data.data;
        this.pagination = res.data.data;
        this.calculateSummary();
        this.spinner.hide();
      });
    }
  }

  refresh() {
    this.spinner.show();

    this.searchForm = this.fb.group({
      name: [null],
      rows_number: Constants.RecordLimit,
      user_id: localStorage.getItem('USERID'),
      tran_type: [''],
      SelectType: [''],
      from_date: [null],
      to_date: [null],
    });

    this.search();
  }
  title = 'angular-app';
  fileName = 'All-Transaction-Report.xlsx';

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

  // Pagination helper methods
  isPageVisible(label: any): boolean {
    if (label === '&laquo;' || label === '&raquo;') {
      return false;
    }

    if (label === '1' || label === '2' || label === '3') {
      return true;
    }

    if (
      parseInt(label) === this.pagination.current_page &&
      parseInt(label) > 3
    ) {
      return true;
    }

    return false;
  }

  searchPage(page: number) {
    const pageLink = this.pagination.links.find(
      (x: any) => Number(x.label) === page,
    );

    if (pageLink?.url) {
      this.search(pageLink.url);
    }
  }

  getPageLabel(label: any): string {
    if (label === '&laquo;' || label === '&raquo;') {
      return '';
    }
    return label;
  }

  onFirstPage() {
    if (this.pagination?.first_page_url) {
      this.search(this.pagination.first_page_url);
    }
  }

  onPreviousPage() {
    if (this.pagination?.prev_page_url) {
      this.search(this.pagination.prev_page_url);
    }
  }

  onNextPage() {
    if (this.pagination?.next_page_url) {
      this.search(this.pagination.next_page_url);
    }
  }

  onLastPage() {
    if (this.pagination?.last_page_url) {
      this.search(this.pagination.last_page_url);
    }
  }

getVisiblePages(): (number | string)[] {
  const current = this.pagination?.current_page;
  const last = this.pagination?.last_page;

  if (!current || !last) {
    return [];
  }

  // small page count
  if (last <= 4) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  // page 1
  if (current === 1) {
    return [1, 2, '...', last];
  }

  // page 2
  if (current === 2) {
    return [1, 2, 3, '...', last];
  }

  // last page
  if (current === last) {
    return [1, '...', last - 1, last];
  }

  // second last page
  if (current === last - 1) {
    return [1, '...', last - 2, last - 1, last];
  }

  // middle pages
  return [1, '...', current - 1, current, current + 1, '...', last];
}

  animateValue(
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void,
  ) {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (end - start) * progress;
      callback(value);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
