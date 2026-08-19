import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../theme/shared/shared.module';
import { FormsModule} from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { FirsttimeRechargeComponent } from './firsttime-recharge.component';
import { FirsttimeRechargeRoutingModule } from './firsttime-recharge-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FirsttimeRechargeRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    NgbModule,NgxPrintModule,NgxSpinnerModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ FirsttimeRechargeComponent],
  providers: [NotificationService]
})

export class FirsttimeRechargeModule { }
