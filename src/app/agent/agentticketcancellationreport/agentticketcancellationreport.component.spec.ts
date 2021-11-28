import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentticketcancellationreportComponent } from './agentticketcancellationreport.component';

describe('AgentticketcancellationreportComponent', () => {
  let component: AgentticketcancellationreportComponent;
  let fixture: ComponentFixture<AgentticketcancellationreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentticketcancellationreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentticketcancellationreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
