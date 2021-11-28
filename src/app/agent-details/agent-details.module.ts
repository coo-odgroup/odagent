import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentDetailsRoutingModule } from './agent-details-routing.module';
import {SharedModule} from '../theme/shared/shared.module';
import {FormsModule } from '@angular/forms';
import { AgentDetailsComponent } from './agent-details.component';
import {NotificationService} from '../services/notification.service';


@NgModule({
  imports: [
    CommonModule,
    AgentDetailsRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [ AgentDetailsComponent],
  providers:[NotificationService]
})
export class AgentDetailsModule { }