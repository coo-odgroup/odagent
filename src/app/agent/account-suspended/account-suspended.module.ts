import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../theme/shared/shared.module';
import { FormsModule} from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { AccountSuspendedComponent } from './account-suspended.component';
import { AccountSuspendedRoutingModule } from './account-suspended-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AccountSuspendedRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    NgbModule,NgxPrintModule,NgxSpinnerModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ AccountSuspendedComponent],
  providers: [NotificationService]
})

export class AccountSuspendedModule { }
