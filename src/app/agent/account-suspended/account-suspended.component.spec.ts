import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSuspendedComponent } from './account-suspended.component';

describe('AccountSuspendedComponent', () => {
  let component: AccountSuspendedComponent;
  let fixture: ComponentFixture<AccountSuspendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSuspendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSuspendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
