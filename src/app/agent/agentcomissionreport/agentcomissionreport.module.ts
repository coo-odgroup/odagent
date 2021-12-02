import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../theme/shared/shared.module';
import { FormsModule} from '@angular/forms';
import { AgentcomissionreportComponent } from './agentcomissionreport.component';
import { NotificationService } from '../../services/notification.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgentComissionReportRoutingModule } from './agentcomissionreport-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  imports: [
    CommonModule,
    AgentComissionReportRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    NgbModule,NgxPrintModule,NgxSpinnerModule
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ AgentcomissionreportComponent],
  providers: [NotificationService]
})

export class AgentComissionReportModule { }
