import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService } from '../../services/bus.service';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-printticket',
  templateUrl: './printticket.component.html',
  styleUrls: ['./printticket.component.scss'],
})
export class PrintticketComponent implements OnInit {
  showTerms: boolean = false;
  ticket: any = {};

  qrcode: string = '';

  elementType = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  // Temporary variables used by copied ticket template
  bookingDate: any = '';
  pnr: any = '';
  entdate: any = '';

  source: any = '';
  destination: any = '';

  busRecord: any = {};
  USERRECORDS: any = {};

  bookingdata: any = {
    PriceArray: {
      odbus_charges_ownerFare: 0,
      customerGst: 0,
    },
  };

  passengerData: any = {
    customerInfo: {
      phone: '',
    },
    bookingInfo: {
      bookingDetail: [],
    },
  };

  total_seat_name: any = '';
  applied_comission: number = 0;
  payableAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
  ) {}

  ngOnInit(): void {
    const pnr = this.route.snapshot.paramMap.get('pnr');

    this.busService.getPrintTicket(pnr).subscribe((res: any) => {
      this.ticket = res.data;

      console.log('PRINT TICKET =>', this.ticket);

      const pnr = this.ticket.booking.pnr;

      this.qrcode = window.location.origin + '/#/printticket/' + pnr;

      this.bookingDate = this.ticket.booking.created_at;
      this.pnr = this.ticket.booking.pnr;
      this.entdate = this.ticket.booking.journey_dt;

      this.source = this.ticket.source?.name || '';
      this.destination = this.ticket.destination?.name || '';

      this.busRecord = this.ticket.bus || {};
      this.USERRECORDS = this.ticket.agent || {};

      this.passengerData = {
        customerInfo: {
          phone: this.ticket.agent?.phone || '',
        },
        bookingInfo: {
          bookingDetail: this.ticket.passengers || [],
        },
      };

      this.bookingdata = {
        PriceArray: {
          odbus_charges_ownerFare: this.ticket.booking.owner_fare || 0,
          customerGst: this.ticket.booking.customer_gst_amount || 0,
        },
      };

      this.applied_comission = this.ticket.booking.agent_commission || 0;

      this.payableAmount = this.ticket.booking.payable_amount || 0;

      this.total_seat_name = this.ticket.passengers
        ?.map((x: any) => x.seat_name)
        .join(', ');
    });
  }

  get_seatno(seat_id: any) {
    return seat_id;
  }

  printTicket(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;

    const popupWindow = window.open('', '_blank', 'width=1000,height=800');

    popupWindow?.document.open();

    popupWindow?.document.write(`
    <html>
      <head>
        <title>Print Ticket</title>

        <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

        <style>
          body {
            padding:20px;
            font-family: Arial, sans-serif;
          }

          table {
            width:100%;
            border-collapse: collapse;
          }

          table, th, td {
            border:1px solid #ddd;
          }

          th, td {
            padding:8px;
          }
        </style>
      </head>

      <body onload="window.print();window.close();">
        ${printContents}
      </body>
    </html>
  `);

    popupWindow?.document.close();
  }
}
