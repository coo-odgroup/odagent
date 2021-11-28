import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpRoutingModule } from './otp-routing.module';
import {SharedModule} from '../theme/shared/shared.module';
import {FormsModule } from '@angular/forms';
import { OtpComponent } from './otp.component';
import {NotificationService} from '../services/notification.service';


@NgModule({
  imports: [
    CommonModule,
    OtpRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [ OtpComponent],
  providers:[NotificationService]
})
export class OtpModule { }