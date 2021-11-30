import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BookTicketComponent } from './book-ticket.component';
import { BookTicketRoutingModule } from './book-ticket-routing.module';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';



const ngWizardConfig: NgWizardConfig = {
    theme: THEME.default
  };

@NgModule({
  imports: [ CommonModule,
    BrowserModule,
    FormsModule,
    NgSelectModule
    BookTicketRoutingModule,
     NgWizardModule.forRoot(ngWizardConfig)],
  bootstrap: [BookTicketComponent],
  declarations: [
    BookTicketComponent
  ]
})
export class BookTicketModule { }

