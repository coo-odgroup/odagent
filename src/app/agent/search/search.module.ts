
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { SearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SearchRoutingModule} from  './search-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule ,
    SearchRoutingModule  ,
    NgSelectModule ,
    LightboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  providers: [],
  bootstrap: [SearchComponent]
})
export class SearchModule { }