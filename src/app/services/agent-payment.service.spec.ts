import { TestBed } from '@angular/core/testing';

import { AgentPaymentService } from './agent-payment.service';

describe('AgentPaymentService', () => {
  let service: AgentPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
