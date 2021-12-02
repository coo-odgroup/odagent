import { Component, OnInit } from '@angular/core';
import { AgentreportService } from '../../services/agentreport.service' ;
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AgentcommissionslabService} from './../../services/agentcommissionslab.service';
import {Customercommisionslab} from '../../model/customercommisionslab';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-customercommissionslab',
  templateUrl: './customercommissionslab.component.html',
  styleUrls: ['./customercommissionslab.component.scss']
})
export class CustomercommissionslabComponent implements OnInit {

  commissionSlab: Customercommisionslab[];
  commissionSlabRecord: Customercommisionslab;

  completedata: any;
  totalfare = 0  ;
  busoperators: any;
  url: any;
  locations: any;
  buses: any;

  constructor(
    private spinner: NgxSpinnerService ,
    private http: HttpClient , 
    private rs:AgentreportService, 
    private acs: AgentcommissionslabService
    ) {   }
  ngOnInit(): void {
    this.spinner.show();
    this.getAll();
  }

 getAll()
 {this.spinner.show();
  this.acs.allcustomerslab().subscribe(
    res => {
      this.completedata= res.data;
      this.spinner.hide();
    }
  );
 }
}
