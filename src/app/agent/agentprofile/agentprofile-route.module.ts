import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgentprofileComponent} from './agentprofile.component';

const routes: Routes = [
  {
    path: '',
    component: AgentprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AgentprofileRoutingModule { }
