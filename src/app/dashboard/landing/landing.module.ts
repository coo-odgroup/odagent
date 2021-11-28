import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandigRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import {SharedModule} from '../../theme/shared/shared.module';
import {AngularHighchartsChartModule} from 'angular-highcharts-chart';
import {NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {ChartModule} from 'angular2-chartjs';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandigRoutingModule,
    SharedModule,
    AngularHighchartsChartModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbDropdownModule,
    ChartModule
  ]
})
export class LandingModule { }
