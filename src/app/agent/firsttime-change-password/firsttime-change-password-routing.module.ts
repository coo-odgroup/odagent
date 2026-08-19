import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirsttimeChangePasswordComponent } from './firsttime-change-password.component';

const routes: Routes = [
  {
    path: '',
    component: FirsttimeChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  FirsttimeChangePasswordRoutingModule { }
