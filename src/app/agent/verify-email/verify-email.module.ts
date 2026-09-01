import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../theme/shared/shared.module';
import { FormsModule} from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { VerifyEmailComponent } from './verify-email.component';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VerifyEmailRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,NgxPrintModule,NgxSpinnerModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ VerifyEmailComponent],
  providers: [NotificationService]
})

export class VerifyEmailModule { }
