import { TestBed } from '@angular/core/testing';

import { AgentprofileService } from './agentprofile.service';

describe('AgentprofileService', () => {
  let service: AgentprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
