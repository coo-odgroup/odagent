import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionslabComponent } from './commissionslab.component';

describe('CommissionslabComponent', () => {
  let component: CommissionslabComponent;
  let fixture: ComponentFixture<CommissionslabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionslabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionslabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
