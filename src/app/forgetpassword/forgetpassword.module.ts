import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordRoutingModule } from './forgetpassword-routing.module';
import {SharedModule} from '../theme/shared/shared.module';
import {FormsModule } from '@angular/forms';
import {NotificationService} from '../services/notification.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';


@NgModule({
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ForgetpasswordComponent],
  providers:[NotificationService]
})
export class ForgetPasswordModule { }