import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercommissionslabComponent } from './customercommissionslab.component';

describe('CustomercommissionslabComponent', () => {
  let component: CustomercommissionslabComponent;
  let fixture: ComponentFixture<CustomercommissionslabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomercommissionslabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercommissionslabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
