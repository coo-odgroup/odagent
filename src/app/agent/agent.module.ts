import { AgentRoutingModule } from './agent-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../theme/shared/shared.module';
import { AgentcompletereportComponent } from './agentcompletereport/agentcompletereport.component';
import { AgentcomissionreportComponent } from './agentcomissionreport/agentcomissionreport.component';
import { AgentticketcancellationreportComponent } from './agentticketcancellationreport/agentticketcancellationreport.component';
import { AgentwalletreportComponent } from './agentwalletreport/agentwalletreport.component';
import { CommissionslabComponent } from './commissionslab/commissionslab.component';
import { CustomercommissionslabComponent } from './customercommissionslab/customercommissionslab.component';
import { BookingComponent } from './booking/booking.component';
import { AgentprofileComponent } from './agentprofile/agentprofile.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { PrintticketComponent } from './printticket/printticket.component';
import { RouteListComponent } from './route-list/route-list.component';



@NgModule({
  declarations: [ 
    PrintticketComponent                    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgentRoutingModule,
    NgxQRCodeModule
  ]
})
export class AgentModule { }
