import { TestBed } from '@angular/core/testing';

import { AgentFeeServiceService } from './agent-fee-service.service';

describe('AgentFeeServiceService', () => {
  let service: AgentFeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentFeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
