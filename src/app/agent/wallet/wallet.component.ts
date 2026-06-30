import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { WalletService } from '../../services/wallet.service';
import { AgentWallet } from '../../model/agentwallet';
import { Constants } from '../../constant/constant';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

declare var Cashfree: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
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

  public paymentPopup = false;
  public paymentStatus = '';
  public paymentMessage = '';
  public paymentAmount: any = 0;
  public availableBalance: any = 0;

  wallet: AgentWallet[];
  walletRecord: AgentWallet;
  busoperators: any;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private fb: FormBuilder,

    private ws: WalletService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.ModalHeading = 'Add New Location';
    this.ModalBtn = 'Save';
  }

  public userEmail: any = '';
  public userMobile: any = '';

  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    const oldDate = new Date();
    oldDate.setDate(today.getDate() - 180);
    this.minDate = oldDate.toISOString().split('T')[0];

    const user = JSON.parse(localStorage.getItem('USERRECORDS'));
    this.userEmail = user?.email || '';
    this.userMobile = user?.phone || '';
    this.spinner.show();
    this.form = this.fb.group({
      id: [null],

      amount: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(50),
          Validators.max(49999),
        ]),
      ],

      remarks: [null],

      user_id: localStorage.getItem('USERID'),
      user_name: localStorage.getItem('USERNAME'),
    });

    this.formConfirm = this.fb.group({
      id: [null],
    });

    this.searchForm = this.fb.group({
      bus_operator_id: [null],
      name: [null],
      payment_via: [''],
      from_date: [null],
      to_date: [null],
      rows_number: Constants.RecordLimit,
    });

    this.route.queryParams.subscribe((params) => {
      if (params['order_id']) {
        this.verifyWalletPayment(params['order_id']);
      }
    });

    this.search();
  }

  expandedWalletIndex: number | null = null;

  toggleWallet(index: number) {
    this.expandedWalletIndex =
      this.expandedWalletIndex === index ? null : index;
  }

  verifyWalletPayment(orderId: any) {
    this.spinner.show();

    this.ws.verifyWalletPayment(orderId).subscribe(
      (resp: any) => {
        this.spinner.hide();

        this.paymentPopup = true;

        if (resp.status) {
          this.paymentStatus = 'success';
          this.paymentAmount = resp.amount;
          this.availableBalance = resp.balance;
          this.paymentMessage = 'Wallet recharge successful';

          this.search();
        } else {
          this.paymentStatus = 'failed';
          this.paymentMessage = 'Wallet recharge failed';
        }
      },
      () => {
        this.spinner.hide();
        this.paymentPopup = true;
        this.paymentStatus = 'failed';
        this.paymentMessage = 'Something went wrong';
      },
    );
  }

  OpenModal(content) {
    this.modalReference = this.modalService.open(content, {
      scrollable: true,
      size: 'xl',
    });
  }

  ResetAttributes() {
    this.walletRecord = {} as AgentWallet;

    this.form = this.fb.group({
      id: [null],

      amount: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(50),
          Validators.max(49999),
        ]),
      ],

      remarks: [null],

      user_id: localStorage.getItem('USERID'),

      user_name: localStorage.getItem('USERNAME'),
    });

    this.ModalHeading = 'Enter Payment Details';

    this.ModalBtn = 'Make Payment';
  }
  page(label: any) {
    return label;
  }

  isFilterOpen = false;

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
    console.log(this.isFilterOpen);
  }

  search(pageurl = '') {
    this.spinner.show();
    const data = {
      name: this.searchForm.value.name,
      from_date: this.searchForm.value.from_date,
      to_date: this.searchForm.value.to_date,
      rows_number: this.searchForm.value.rows_number,
      user_id: localStorage.getItem('USERID'),
    };

    // console.log(data);
    if (pageurl != '') {
      this.ws.getAllaginationData(pageurl, data).subscribe({
        next: (res) => {
          this.wallet = res.data.data.data;
          this.pagination = res.data.data;
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
        },
      });
    } else {
      this.ws.getAllData(data).subscribe({
        next: (res) => {
          this.wallet = res.data.data.data;
          this.pagination = res.data.data;
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
        },
      });
    }
  }

  refresh() {
    this.spinner.show();
    this.searchForm = this.fb.group({
      name: [null],
      from_date: [null],
      payment_via: [''],
      to_date: [null],
      rows_number: Constants.RecordLimit,
      user_id: localStorage.getItem('USERID'),
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
      amount: this.form.value.amount,
      remarks: this.form.value.remarks,
      user_id: localStorage.getItem('USERID'),
      user_name: localStorage.getItem('USERNAME'),
      transaction_type: 'c',
      frontend_url: window.location.origin,
    };

    this.ws.makeWalletPayment(data).subscribe((resp: any) => {
      this.spinner.hide();

      if (resp.status == 1) {
        const cashfree = Cashfree({
          mode: 'production',
        }); 

        cashfree.checkout({
          paymentSessionId: resp.data.payment_session_id,
          redirectTarget: '_self',
        });
      } else {
        this.notificationService.addToast({
          title: 'Error',
          msg: resp.message,
          type: 'error',
        });
      }
    });
  }

  onPreviousPage() {
    if (this.pagination.links.prev_page_url) {
      this.search(this.pagination.links.prev_page_url);
    }
  }

  onNextPage() {
    if (this.pagination.links.next_page_url) {
      this.search(this.pagination.links.next_page_url);
    }
  }

  closePaymentPopup() {
    this.paymentPopup = false;

    this.router.navigate(['/agent/wallet']);
  }

  getVisiblePages(): (number | string)[] {
    const current = this.pagination?.current_page;
    const last = this.pagination?.last_page;

    if (!current || !last) {
      return [];
    }

    if (last <= 4) {
      return Array.from({ length: last }, (_, i) => i + 1);
    }

    if (current === 1) {
      return [1, 2, '...', last];
    }

    if (current === 2) {
      return [1, 2, 3, '...', last];
    }

    if (current === last) {
      return [1, '...', last - 1, last];
    }

    if (current === last - 1) {
      return [1, '...', last - 2, last - 1, last];
    }

    return [1, '...', current - 1, current, current + 1, '...', last];
  }

  searchPage(page: number) {
    const pageLink = this.pagination?.links?.find(
      (x: any) => Number(x.label) === page,
    );

    if (pageLink?.url) {
      this.search(pageLink.url);
    }
  }
}
