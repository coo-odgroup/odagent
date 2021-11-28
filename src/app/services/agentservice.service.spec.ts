import { TestBed } from '@angular/core/testing';

import { AgentserviceService } from './agentservice.service';

describe('AgentserviceService', () => {
  let service: AgentserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
