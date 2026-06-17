import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Agentnotification } from '../../model/agentnotification';
import { AgentnotificationService } from '../../services/agentnotification.service';
import { Constants } from '../../constant/constant';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  public formConfirm: FormGroup;
  public searchFrom: FormGroup;

  modalReference: NgbModalRef;
  confirmDialogReference: NgbModalRef;

  public isSubmit: boolean;
  public ModalHeading: any;
  public ModalBtn: any;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  notificationcontent: Agentnotification[];
  notificationcontentRecord: Agentnotification;
  pagination: any;
  busoperators: any;

  /* =========================================
     CUSTOM MOBILE DROPDOWN
  ========================================= */

  public showDropdown: boolean = false;

  public selectedNotificationCount: any = 10;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private ans: AgentnotificationService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.ModalHeading = 'View Details';

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.spinner.show();

    this.searchFrom = this.fb.group({
      rows_number: Constants.RecordLimit,
      rangeFromDate: [null],
      rangeToDate: [null],
    });

    this.selectedNotificationCount = Constants.RecordLimit;

    this.search();
  }

  /* =========================================
     CUSTOM DROPDOWN
  ========================================= */

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public getSelectedText(): string {
    if (this.selectedNotificationCount === 'all') {
      return 'All Notifications';
    }

    return this.selectedNotificationCount + ' Notifications';
  }

  public selectNotificationCount(value: any): void {
    this.selectedNotificationCount = value;

    this.searchFrom.patchValue({
      rows_number: value,
    });

    this.showDropdown = false;

    this.search();
  }

  OpenModal(content) {
    this.modalReference = this.modalService.open(content, {
      scrollable: true,
      size: 'lg',
    });
  }

  page(label: any) {
    return label;
  }

  search(pageurl = '') {
    this.spinner.show();

    const data = {
      rows_number: this.searchFrom.value.rows_number,
      rangeFromDate: this.searchFrom.value.rangeFromDate,
      rangeToDate: this.searchFrom.value.rangeToDate,
      user_id: localStorage.getItem('USERID'),
    };

    if (pageurl != '') {
      this.ans.notificationpaginationReport(pageurl, data).subscribe((res) => {
        this.notificationcontent = res.data.data.data;
        this.pagination = res.data.data;

        this.spinner.hide();
      });
    } else {
      this.ans.notificationReport(data).subscribe((res) => {
        this.notificationcontent = res.data.data.data;
        this.pagination = res.data.data;

        this.spinner.hide();
      });
    }
  }

  refresh() {
    this.spinner.show();

    this.searchFrom = this.fb.group({
      rows_number: Constants.RecordLimit,
      rangeFromDate: [null],
      rangeToDate: [null],
    });

    this.selectedNotificationCount = Constants.RecordLimit;

    this.search();
  }

  viewDetails(index) {
    this.notificationcontentRecord = this.notificationcontent[index];
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;

    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.searchFrom.controls.rangeFromDate.setValue(date);

      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
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

    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  /* =========================================
     PAGINATION
  ========================================= */

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
