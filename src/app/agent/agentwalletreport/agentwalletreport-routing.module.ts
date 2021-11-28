import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgentwalletreportComponent} from './agentwalletreport.component';

const routes: Routes = [
  {
    path: '',
    component: AgentwalletreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentWalletReportRoutingModule { }
