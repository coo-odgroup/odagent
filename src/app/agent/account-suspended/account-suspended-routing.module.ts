import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSuspendedComponent } from './account-suspended.component';


const routes: Routes = [
  {
    path: '',
    component: AccountSuspendedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AccountSuspendedRoutingModule { }
