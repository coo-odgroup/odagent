import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsttimeRechargeComponent } from './firsttime-recharge.component';

describe('FirsttimeRechargeComponent', () => {
  let component: FirsttimeRechargeComponent;
  let fixture: ComponentFixture<FirsttimeRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirsttimeRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsttimeRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
