import { Component, OnInit } from '@angular/core';
import { AgentreportService } from '../../services/agentreport.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusOperatorService } from './../../services/bus-operator.service';
import { LocationService } from '../../services/location.service';
import { BusService } from '../../services/bus.service';
import { CancelTicketsReport } from '../../model/cancelticketsreports';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '../../constant/constant';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agentticketcancellationreport',
  templateUrl: './agentticketcancellationreport.component.html',
  styleUrls: ['./agentticketcancellationreport.component.scss'],
})
export class AgentticketcancellationreportComponent implements OnInit {
  showFilter = false;
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

  totalRecords = 0;
  totalFare = 0;
  totalRefund = 0;
  balanceAmount = 0;

  animatedTotalRecords = 0;
  animatedTotalFare = 0;
  animatedTotalRefund = 0;
  animatedBalanceAmount = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private fb: FormBuilder,
    private locationService: LocationService,
    private busService: BusService,
    private rs: AgentreportService,
    private busOperatorService: BusOperatorService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      bus_operator_id: [null],
      payment_id: [null],
      date_type: ['booking'],
      rows_number: Constants.RecordLimit,
      source_id: [null],
      destination_id: [null],
      rangeFromDate: [null],
      rangeToDate: [null],
    });
    this.search();
    this.loadServices();
  }

  page(label: any) {
    return label;
  }
  search(pageurl = '') {
    this.spinner.show();
    this.cancelTicketsReportRecord = this.searchFrom.value;

    const data = {
      bus_operator_id: this.cancelTicketsReportRecord.bus_operator_id,
      payment_id: this.cancelTicketsReportRecord.payment_id,
      date_type: this.cancelTicketsReportRecord.date_type,
      rows_number: this.cancelTicketsReportRecord.rows_number,
      source_id: this.cancelTicketsReportRecord.source_id,
      destination_id: this.cancelTicketsReportRecord.destination_id,
      rangeFromDate: this.cancelTicketsReportRecord.rangeFromDate,
      rangeToDate: this.cancelTicketsReportRecord.rangeToDate,
      user_id: localStorage.getItem('USERID'),
    };

    if (pageurl != '') {
      this.rs.cancelticketpaginationReport(pageurl, data).subscribe((res) => {
        this.cancelticketdata = res.data;
        this.calculateSummary();

        this.spinner.hide();
      });
    } else {
      this.rs.cancelticketReport(data).subscribe((res) => {
        this.cancelticketdata = res.data;
        this.calculateSummary();
        // console.log(this.cancelticketdata);
        this.spinner.hide();
      });
    }
  }

  title = 'angular-app';
  fileName = 'Cancel-Ticket-Report.xlsx';

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

  refresh() {
    this.spinner.show();
    this.searchFrom = this.fb.group({
      bus_operator_id: [null],
      payment_id: [null],
      date_type: [''],
      rows_number: Constants.RecordLimit,
      source_id: [null],
      destination_id: [null],
      rangeFromDate: [null],
      rangeToDate: [null],
    });
    this.loadServices();
    this.search();
  }

  loadServices() {
    this.busOperatorService.readAll().subscribe((res) => {
      this.busoperators = res.data;
    });
    this.locationService.readAll().subscribe((records) => {
      this.locations = records.data;
    });
  }

  findSource(event: any) {
    let source_id = this.searchFrom.controls.source_id.value;
    let destination_id = this.searchFrom.controls.destination_id.value;

    if (source_id != '' && destination_id != '') {
      this.busService.findSource(source_id, destination_id).subscribe((res) => {
        this.buses = res.data;
      });
    } else {
      this.busService.all().subscribe((res) => {
        this.buses = res.data;
      });
    }
  }

  onPreviousPageCancel() {
    if (
      this.cancelticketdata?.data &&
      this.cancelticketdata.data.prev_page_url
    ) {
      this.search(this.cancelticketdata.data.prev_page_url);
    }
  }

  onNextPageCancel() {
    if (
      this.cancelticketdata?.data &&
      this.cancelticketdata.data.next_page_url
    ) {
      this.search(this.cancelticketdata.data.next_page_url);
    }
  }
  getVisiblePagesCancel(): (number | string)[] {
    const current = this.cancelticketdata?.data?.current_page;
    const last = this.cancelticketdata?.data?.last_page;

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

  calculateSummary() {
    let totalRecords = 0;
    let totalFare = 0;
    let totalRefund = 0;
    let balanceAmount = 0;

    const records = this.cancelticketdata?.data?.data || [];

    totalRecords = records.length;

    records.forEach((item: any) => {
      totalFare += Number(item.total_fare || 0);
      totalRefund += Number(item.refund_amount || 0);
    });

    balanceAmount = totalFare - totalRefund;

    // Store actual values
    this.totalRecords = totalRecords;
    this.totalFare = totalFare;
    this.totalRefund = totalRefund;
    this.balanceAmount = balanceAmount;

    // Animate values
    this.animateValue(
      this.animatedTotalRecords,
      totalRecords,
      1000,
      (value) => {
        this.animatedTotalRecords = Math.round(value);
      },
    );

    this.animateValue(this.animatedTotalFare, totalFare, 1000, (value) => {
      this.animatedTotalFare = value;
    });

    this.animateValue(this.animatedTotalRefund, totalRefund, 1000, (value) => {
      this.animatedTotalRefund = value;
    });

    this.animateValue(
      this.animatedBalanceAmount,
      balanceAmount,
      1000,
      (value) => {
        this.animatedBalanceAmount = value;
      },
    );
  }

  searchPageCancel(page: number) {
    const pageLink = this.cancelticketdata?.data?.links?.find(
      (x: any) => Number(x.label) === page,
    );

    if (pageLink?.url) {
      this.search(pageLink.url);
    }
  }

  getSeatNames(complete: any): string {
    if (!complete?.booking_detail?.length) {
      return '--';
    }

    return complete.booking_detail
      .map((seat: any) =>
        complete.origin === 'DOLPHIN' || complete.origin === 'MANTIS'
          ? seat.seat_name
          : seat.bus_seats?.seats?.seatText,
      )
      .join(', ');
  }

  getPassengerNames(complete: any): string {
    if (!complete?.booking_detail?.length) {
      return '--';
    }

    return complete.booking_detail.map((p: any) => p.passenger_name).join(', ');
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
