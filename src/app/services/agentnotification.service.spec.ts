import { TestBed } from '@angular/core/testing';

import { AgentnotificationService } from './agentnotification.service';

describe('AgentnotificationService', () => {
  let service: AgentnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
