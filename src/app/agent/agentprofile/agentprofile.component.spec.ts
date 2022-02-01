import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentprofileComponent } from './agentprofile.component';

describe('AgentprofileComponent', () => {
  let component: AgentprofileComponent;
  let fixture: ComponentFixture<AgentprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
