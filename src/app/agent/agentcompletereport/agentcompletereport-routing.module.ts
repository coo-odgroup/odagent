import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgentcompletereportComponent} from './agentcompletereport.component';

const routes: Routes = [
  {
    path: '',
    component: AgentcompletereportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AgentCompleteReportRoutingModule { }
