import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcomissionreportComponent } from './agentcomissionreport.component';

describe('AgentcomissionreportComponent', () => {
  let component: AgentcomissionreportComponent;
  let fixture: ComponentFixture<AgentcomissionreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentcomissionreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentcomissionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
