import { TestBed } from '@angular/core/testing';

import { AgentwalletrequestService } from './agentwalletrequest.service';

describe('AgentwalletrequestService', () => {
  let service: AgentwalletrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentwalletrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
