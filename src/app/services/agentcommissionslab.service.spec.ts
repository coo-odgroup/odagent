import { TestBed } from '@angular/core/testing';

import { AgentcommissionslabService } from './agentcommissionslab.service';

describe('AgentcommissionslabService', () => {
  let service: AgentcommissionslabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentcommissionslabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
