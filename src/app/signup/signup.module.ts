import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import {SharedModule} from '../theme/shared/shared.module';
import {FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import {NotificationService} from '../services/notification.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [ SignupComponent],
  providers:[NotificationService]
})
export class SignupModule { }