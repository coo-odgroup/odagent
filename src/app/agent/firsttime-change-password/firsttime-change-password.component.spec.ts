import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsttimeChangePasswordComponent } from './firsttime-change-password.component';

describe('FirsttimechangePasswordComponent', () => {
  let component: FirsttimeResetPasswordComponent;
  let fixture: ComponentFixture<FirsttimeResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirsttimeChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsttimeChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
