import { Component, OnInit } from '@angular/core';
import { AgentreportService } from '../../services/agentreport.service' ;
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AgentcommissionslabService} from './../../services/agentcommissionslab.service';
import {Agentcommissionslab} from '../../model/agentcommissionslab';


@Component({
  selector: 'app-commissionslab',
  templateUrl: './commissionslab.component.html',
  styleUrls: ['./commissionslab.component.scss']
})
export class CommissionslabComponent implements OnInit {

  commissionSlab: Agentcommissionslab[];
  commissionSlabRecord: Agentcommissionslab;

  completedata: any;
  totalfare = 0  ;
  busoperators: any;
  url: any;
  locations: any;
  buses: any;

  constructor(
    private http: HttpClient , 
    private rs:AgentreportService, 
    private acs: AgentcommissionslabService
    ) {   }
  ngOnInit(): void {

    this.getAll();
  }

 getAll()
 {
  this.acs.allagentslab().subscribe(
    res => {
      this.completedata= res.data;
    }
  );
 }

}
