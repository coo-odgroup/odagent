import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgentticketcancellationreportComponent} from './agentticketcancellationreport.component';

const routes: Routes = [
  {
    path: '',
    component: AgentticketcancellationreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentTicketCancellationReportRoutingModule { }
