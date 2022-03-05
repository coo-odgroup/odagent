import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookTicketComponent } from './book-ticket.component';
import { BookTicketRoutingModule } from './book-ticket-routing.module';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountdownModule } from 'ngx-countdown';
import { NgxPrintModule } from 'ngx-print';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CountdownModule,
    NgxPrintModule,
    BookTicketRoutingModule,NgxSpinnerModule,
    NgxQRCodeModule,
    NgWizardModule.forRoot(ngWizardConfig)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [BookTicketComponent],
  declarations: [
    BookTicketComponent
  ]
})
export class BookTicketModule { }

