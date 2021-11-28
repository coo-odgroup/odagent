import { TestBed } from '@angular/core/testing';

import { AgentCommissionServiceService } from './agent-commission-service.service';

describe('AgentCommissionServiceService', () => {
  let service: AgentCommissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentCommissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
