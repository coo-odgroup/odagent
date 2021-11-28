import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HowtouseComponent} from './howtouse.component';


const routes: Routes = [
  {
    path: '',
    component: HowtouseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowtouseRoutingModule { }
