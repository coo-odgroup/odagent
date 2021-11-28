import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowtouseRoutingModule } from './howtouse-routing.module';
import {SharedModule} from '../theme/shared/shared.module';
import {FormsModule } from '@angular/forms';
import { HowtouseComponent } from './howtouse.component';
import {NotificationService} from '../services/notification.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    HowtouseRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [ HowtouseComponent],
  providers:[NotificationService]
})
export class HowtouseModule { }