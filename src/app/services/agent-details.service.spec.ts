import { TestBed } from '@angular/core/testing';

import { AgentDetailsService } from './agent-details.service';

describe('AgentDetailsService', () => {
  let service: AgentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
