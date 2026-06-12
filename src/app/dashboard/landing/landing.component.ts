import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import * as Highcharts from 'highcharts';
import HC_drilldown from 'highcharts/modules/drilldown';
HC_drilldown(Highcharts);

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {
  public RangeText: any;
  public supportChartData1: any;
  public supportChartData2: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;
  public powerCardChartData1: any;
  public powerCardChartData2: any;
  public barBasicChartOptions: any;
  public pie2CAC: any;
  public Highcharts = Highcharts;
  public isCollapsed: boolean;
  public isMail: string;
  public isSubMail: string;
  public barBasicChartData: any;
  public barBasicChartOption: any;

  public RoleType: any;
  @ViewChild('barBasicChart') barBasicChart: ElementRef; // used barStackedChart, barHorizontalChart
  public barBasicChartTag: CanvasRenderingContext2D;

  dashboarddata: any;
  routedata: any;
  oprdata: any;
  ticketdata: any;
  bookingdata: any;
  prndata: any;

  bookingDetails: any[] = [];
  walletTransactions: any[] = [];
  showBookingTable = false;
  showWalletTable = true;

  animatedTodayPnr = 0;
  animatedUpcomingPnr = 0;
  animatedSales = 0;
  animatedOdbusCommission = 0;
  animatedCustomerCommission = 0;

  pnr_date: any;
  pnr_label: any;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private ds: DashboardService,
  ) {
    this.RoleType = localStorage.getItem('ROLE_ID');
    this.isCollapsed = false;
    this.isMail = 'inbox';
    this.isSubMail = 'primary';

    this.barBasicChartOptions = {
      chart: {
        type: 'column',
      },
      colors: ['#1abc9c', '#000000', '#2ecc71'],
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Booking',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:6px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Total Tickets (35)',
          data: [
            49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
            95.6, 54.4,
          ],
        },
        {
          name: 'Desktop Tickets (25)',
          data: [
            83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
            106.6, 92.3,
          ],
        },
        {
          name: 'App Tickets (10)',
          data: [
            48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
            51.2,
          ],
        },
      ],
    };

    this.barBasicChartOption = {
      barValueSpacing: 10,
    };
  }
  pieChart() {
    //console.log(this.dashboarddata.web_booking.length);
    this.pie2CAC = {
      chart: {
        height: 270,
        type: 'donut',
      },
      // series:[ this.dashboarddata.mobile_booking.length, this.dashboarddata.web_booking.length, this.dashboarddata.app_booking.length],
      labels: ['Mobile', 'Desktop', 'App'],
      colors: ['#00acc1', '#ffa21d', '#ff5252'],
      legend: { show: true, position: 'bottom' },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: true,
              floating: true,
              fontSize: '14px',
              position: 'left',
              offsetX: 0,
              offsetY: 0,
              labels: {
                useSeriesColors: true,
              },
              markers: {
                size: 0,
              },
              formatter: (seriesName, opts) =>
                seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex],
              itemMargin: {
                horizontal: 1,
              },
            },
          },
        },
      ],
    };
  }
  ngAfterViewInit() { }

  ngOnInit() {
    const data = {
      rangeFor: '',
      rangeFrom: '',
      rangeTo: '',
    };

    this.getall('Today');
    this.showWalletTable = true;
    this.showBookingTable = false;
    this.loadWalletTransactions();
    this.operatordata();
    this.pnrstaticsdata('Today');
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

  getall(range: any) {
    this.selectedRange = range;
    this.spinner.show();

    this.showBookingTable = true;
    this.showWalletTable = false;
    this.showCustomDate = false;

    const today = new Date();

    if (range === 'Today') {
      this.RangeText = `Today (${this.formatDate(today)})`;
    } else if (range === 'This Week') {
      const week = this.getWeekRange();

      this.RangeText = `This Week (${week.from} - ${week.to})`;
    } else if (range === 'This Month') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

      this.RangeText = `This Month (${this.formatDate(firstDay)} - ${this.formatDate(today)})`;
    } else {
      this.RangeText = range;
    }

    const data = {
      rangeFor: range,
      rangeFrom: '',
      rangeTo: '',
      USER_BUS_OPERATOR_ID: localStorage.getItem('USER_BUS_OPERATOR_ID'),
      USERID: localStorage.getItem('USERID'),
    };

    this.ds.dashboard(data).subscribe({
      next: (res) => {
        this.dashboarddata = res.data;
        this.animateDashboardCards();
        this.pieChart();

        this.loadBookingDetails(range);
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }

  expandedBooking: number | null = null;

  toggleBooking(index: number) {
    this.expandedBooking = this.expandedBooking === index ? null : index;
  }

  getTotalCommission(booking: any): number {
    return (
      Number(booking.agent_commission || 0) +
      Number(booking.customer_comission || 0)
    );
  }

  animateDashboardCards() {
    this.animatedTodayPnr = 0;
    this.animatedUpcomingPnr = 0;
    this.animatedSales = 0;
    this.animatedOdbusCommission = 0;
    this.animatedCustomerCommission = 0;

    this.animateValue(
      0,
      Number(this.dashboarddata.today_pnr || 0),
      1500,
      (v) => (this.animatedTodayPnr = Math.floor(v)),
    );

    this.animateValue(
      0,
      Number(this.dashboarddata.upcoming_pnr || 0),
      1500,
      (v) => (this.animatedUpcomingPnr = Math.floor(v)),
    );

    this.animateValue(
      0,
      Number(this.dashboarddata.sales_data?.[0]?.today_amount || 0),
      1500,
      (v) => (this.animatedSales = v),
    );

    this.animateValue(
      0,
      Number(this.dashboarddata.booking_profit?.[0]?.odbus_amount || 0),
      1500,
      (v) => (this.animatedOdbusCommission = v),
    );

    this.animateValue(
      0,
      Number(this.dashboarddata.customer_profit?.[0]?.customer_amount || 0),
      1500,
      (v) => (this.animatedCustomerCommission = v),
    );
  }

  loadWalletTransactions() {
    const data = {
      user_id: localStorage.getItem('USERID'),
    };

    this.ds.lastWalletTransactions(data).subscribe((res) => {
      this.walletTransactions = res.data;

      console.log(this.walletTransactions);
    });
  }
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  getWeekRange() {
    const today = new Date();

    const from = new Date(today);
    from.setDate(today.getDate() - 6);

    return {
      from: this.formatDate(from),
      to: this.formatDate(today),
    };
  }

  formatCustomDate(dateObj: any): string {
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);

    return this.formatDate(date);
  }

  loadBookingDetails(range = 'Today', from = '', to = '') {
    const data = {
      rangeFor: range,
      rangeFrom: from,
      rangeTo: to,
      USERID: localStorage.getItem('USERID'),
      ROLE_ID: localStorage.getItem('ROLE_ID'),
    };

    this.ds.bookingDetails(data).subscribe({
      next: (res) => {
        this.bookingDetails = res.data;
        this.spinner.hide(); // Hide after all data loads
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }

  operatordata() {
    this.ds.operatordata().subscribe((res) => {
      this.oprdata = res.data;
      // console.log(res.data);
    });
  }

  ticketstaticsdata() {
    this.ds.ticketstaticsdata().subscribe((res) => {
      this.ticketdata = res.data;
      // console.log(res.data);
    });
  }

  bookingbydevicedata() {
    this.ds.bookingbydevicedata().subscribe((res) => {
      this.bookingdata = res.data;
      // console.log(res.data);
    });
  }

  showCustomDate = false;

  customFromDate: any = '';
  customToDate: any = '';
  selectedRange = 'Today';
  today = new Date();

  maxDate = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDate(),
  };

  minDateObj = new Date(new Date().setDate(new Date().getDate() - 180));

  minDate = {
    year: this.minDateObj.getFullYear(),
    month: this.minDateObj.getMonth() + 1,
    day: this.minDateObj.getDate(),
  };

  toggleCustomDate() {
    this.selectedRange = 'Custom';
    this.showCustomDate = true;
  }

  applyCustomDate() {
    this.spinner.show();

    if (!this.customFromDate || !this.customToDate) {
      this.spinner.hide();
      alert('Please select both dates');
      return;
    }

    // const from =
    //   this.customFromDate.year +
    //   '-' +
    //   ('0' + this.customFromDate.month).slice(-2) +
    //   '-' +
    //   ('0' + this.customFromDate.day).slice(-2);
    const from = this.customFromDate;
    const to = this.customToDate;

    // const to =
    //   this.customToDate.year +
    //   '-' +
    //   ('0' + this.customToDate.month).slice(-2) +
    //   '-' +
    //   ('0' + this.customToDate.day).slice(-2);

    const data = {
      rangeFor: 'Custom',
      rangeFrom: from,
      rangeTo: to,
      USER_BUS_OPERATOR_ID: localStorage.getItem('USER_BUS_OPERATOR_ID'),
      USERID: localStorage.getItem('USERID'),
    };

    // this.RangeText =
    //   this.formatCustomDate(this.customFromDate) +
    //   ' - ' +
    //   this.formatCustomDate(this.customToDate);
    this.RangeText =
      this.formatDate(new Date(this.customFromDate)) +
      ' - ' +
      this.formatDate(new Date(this.customToDate));

    this.ds.dashboard(data).subscribe((res) => {
      this.dashboarddata = res.data;
      this.animateDashboardCards();
      this.pieChart();
    });

    this.ds.pnrstaticsdata(data).subscribe((res) => {
      this.prndata = res.data;
    });

    this.showBookingTable = true;
    this.showWalletTable = false;

    this.showCustomDate = false;

    this.loadBookingDetails('Custom', from, to);
  }

  pnrstaticsdata(range: any) {
    const data = {
      dateRange: range,
      USER_BUS_OPERATOR_ID: localStorage.getItem('USER_BUS_OPERATOR_ID'),
    };
    setTimeout(() => {
      this.ds.pnrstaticsdata(data).subscribe((res) => {
        this.prndata = res.data;

        this.barBasicChartData = {
          labels: this.prndata.date,
          datasets: [
            {
              label: 'PNR',
              data: this.prndata.pnr,
              borderColor: '00acc1',
              backgroundColor: '00acc1',
              hoverborderColor: '00acc1',
              hoverBackgroundColor: '00acc1',
            },
          ],
        };
      });
    });
  }
}
