import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsttimeResetPasswordComponent } from './firsttime-reset-password.component';

describe('FirsttimeResetPasswordComponent', () => {
  let component: FirsttimeResetPasswordComponent;
  let fixture: ComponentFixture<FirsttimeResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirsttimeResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsttimeResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
