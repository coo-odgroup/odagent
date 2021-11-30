import { TestBed } from '@angular/core/testing';

import { AgentPaymentStatusService } from './agent-payment-status.service';

describe('AgentPaymentStatusService', () => {
  let service: AgentPaymentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentPaymentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
