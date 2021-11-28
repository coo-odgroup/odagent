import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentwalletreportComponent } from './agentwalletreport.component';

describe('AgentwalletreportComponent', () => {
  let component: AgentwalletreportComponent;
  let fixture: ComponentFixture<AgentwalletreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentwalletreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentwalletreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
