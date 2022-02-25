import { Component, OnInit, ViewEncapsulation,ElementRef,ViewChild} from '@angular/core';

import {DashboardService} from '../../services/dashboard.service';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import * as Highcharts from 'highcharts';
import HC_drilldown from 'highcharts/modules/drilldown';
HC_drilldown(Highcharts);

import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

    public RangeText:any;
    public supportChartData1: any;
    public supportChartData2: any;
    public seoChartData1: any;
    public seoChartData2: any;
    public seoChartData3: any;
    public powerCardChartData1: any;
    public powerCardChartData2: any;
    public barBasicChartOptions: any;
    public pie2CAC:any;
    public Highcharts = Highcharts;
    public isCollapsed: boolean;
    public isMail: string;
    public isSubMail: string;
    public barBasicChartData: any;
    public barBasicChartOption: any;

    public RoleType:any;
    @ViewChild('barBasicChart') barBasicChart: ElementRef; // used barStackedChart, barHorizontalChart
    public barBasicChartTag: CanvasRenderingContext2D;
    
    dashboarddata: any;
    routedata: any;
    oprdata: any;
    ticketdata: any;
    bookingdata: any;
    prndata: any;

    pnr_date: any;
    pnr_label: any;


    constructor(private spinner: NgxSpinnerService ,private http: HttpClient , private ds:DashboardService) {

      
      this.RoleType=localStorage.getItem("ROLE_ID");
      this.isCollapsed = false;
      this.isMail = 'inbox';
      this.isSubMail = 'primary';

      
      
    
      this.barBasicChartOptions = {
        chart: {
          type: 'column'
        },
        colors: ['#1abc9c', '#000000', '#2ecc71'],
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Booking'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:6px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Total Tickets (35)',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
          name: 'Desktop Tickets (25)',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
          name: 'App Tickets (10)',
          data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }]
      };

      this.barBasicChartOption = {
        barValueSpacing: 10
      };
      
    }
    pieChart()
    {
      //console.log(this.dashboarddata.web_booking.length);
      this.pie2CAC = {
        chart: {
          height: 270,
          type: 'donut',
        },
        // series:[ this.dashboarddata.mobile_booking.length, this.dashboarddata.web_booking.length, this.dashboarddata.app_booking.length],
        labels: ['Mobile', 'Desktop', 'App'],
        colors: [ '#00acc1', '#ffa21d', '#ff5252'],
        legend: { show: true, position: 'bottom',},
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  show: true
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: true,
          dropShadow: {
            enabled: false,
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
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
                size: 0
              },
              formatter: (seriesName, opts) => seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex],
              itemMargin: {
                horizontal: 1,
              }
            }
          }
        }]
      };
    }
    ngAfterViewInit()
    {
      
    }
  
    ngOnInit() {
      // this.spinner.show();
      const data={
        rangeFor:"",
        rangeFrom:"",
        rangeTo:""
      };
      this.getall("All");
      this.toproute();
      this.operatordata();
      this.pnrstaticsdata("All");


     
      
    }

   
    getall(range:any) {
      this.RangeText=range;
    
      const data={
        rangeFor:range,
        rangeFrom:"",
        rangeTo:"",
        USER_BUS_OPERATOR_ID:localStorage.getItem("USER_BUS_OPERATOR_ID"),
        USERID:localStorage.getItem("USERID")
      };
      this.ds.dashboard(data).subscribe(
        res => {
          this.dashboarddata= res.data;
          // console.log( this.dashboarddata);
          this.pieChart();

          
          // var chart = new ApexCharts(document.querySelector("#pie-chart-2-cac"),this.pie2CAC);
         // this.pie2CAC.render();
         
         this.spinner.hide();
          
        }
      );
    }

    toproute() {
      const data={
        USERID:localStorage.getItem("USERID"),
        ROLE_ID:localStorage.getItem("ROLE_ID"),
      };
      this.ds.toproute(data).subscribe(
        res => {
          this.routedata= res.data;
         
        }
      );
    }

    operatordata() {
      this.ds.operatordata().subscribe(
        res => {
          this.oprdata= res.data;
          // console.log(res.data);
        }
      );
    }

    ticketstaticsdata() {
      this.ds.ticketstaticsdata().subscribe(
        res => {
          this.ticketdata= res.data;
          // console.log(res.data);
        }
      );
    }

    bookingbydevicedata() {
      this.ds.bookingbydevicedata().subscribe(
        res => {
          this.bookingdata= res.data;
          // console.log(res.data);
        }
      );
    }
    

    pnrstaticsdata(range:any) {
      const data={
        dateRange:range,
        USER_BUS_OPERATOR_ID:localStorage.getItem("USER_BUS_OPERATOR_ID")
      };
      setTimeout(() => {
        this.ds.pnrstaticsdata(data).subscribe(
          res => {
            this.prndata= res.data;
            
            this.barBasicChartData = {
              labels: this.prndata.date,
              datasets: [{
                label: 'PNR',
                data:this.prndata.pnr,
                borderColor: "00acc1",
                backgroundColor: "00acc1",
                hoverborderColor: "00acc1",
                hoverBackgroundColor: "00acc1",
              }]
            };
          }
        );
        
          
      });  
    }
}
