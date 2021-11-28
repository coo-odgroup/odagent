import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommissionslabComponent} from './commissionslab.component';

const routes: Routes = [
  {
    path: '',
    component: CommissionslabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionslabRoutingModule { }
