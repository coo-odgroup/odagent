import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgentcomissionreportComponent} from './agentcomissionreport.component';

const routes: Routes = [
  {
    path: '',
    component: AgentcomissionreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AgentComissionReportRoutingModule { }
