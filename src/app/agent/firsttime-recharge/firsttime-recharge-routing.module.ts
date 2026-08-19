import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirsttimeRechargeComponent } from './firsttime-recharge.component';

const routes: Routes = [
  {
    path: '',
    component: FirsttimeRechargeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  FirsttimeRechargeRoutingModule { }
