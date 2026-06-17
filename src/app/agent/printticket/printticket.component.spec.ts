import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintticketComponent } from './printticket.component';

describe('PrintticketComponent', () => {
  let component: PrintticketComponent;
  let fixture: ComponentFixture<PrintticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
