import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcompletereportComponent } from './agentcompletereport.component';

describe('AgentcompletereportComponent', () => {
  let component: AgentcompletereportComponent;
  let fixture: ComponentFixture<AgentcompletereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentcompletereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentcompletereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
