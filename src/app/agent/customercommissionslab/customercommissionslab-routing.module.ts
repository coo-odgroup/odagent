import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomercommissionslabComponent} from './customercommissionslab.component';

const routes: Routes = [
  {
    path: '',
    component: CustomercommissionslabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerCommissionSlabRoutingModule { }
