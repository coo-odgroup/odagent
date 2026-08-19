import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../theme/shared/shared.module';
import { FormsModule} from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { FirsttimeChangePasswordComponent } from './firsttime-change-password.component';
import { FirsttimeChangePasswordRoutingModule } from './firsttime-change-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FirsttimeChangePasswordRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,NgxPrintModule,NgxSpinnerModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ FirsttimeChangePasswordComponent],
  providers: [NotificationService]
})

export class FirsttimeChangePasswordModule { }
