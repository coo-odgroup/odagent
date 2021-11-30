import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BookTicketComponent } from './book-ticket.component';
import { BookTicketRoutingModule } from './book-ticket-routing.module';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountdownModule } from 'ngx-countdown';



const ngWizardConfig: NgWizardConfig = {
    theme: THEME.default
  };

@NgModule({
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CountdownModule,
    BookTicketRoutingModule,
     NgWizardModule.forRoot(ngWizardConfig)],
  bootstrap: [BookTicketComponent],
  declarations: [
    BookTicketComponent
  ]
})
export class BookTicketModule { }

