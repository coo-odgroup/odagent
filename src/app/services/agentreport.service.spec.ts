import { TestBed } from '@angular/core/testing';

import { AgentreportService } from './agentreport.service';

describe('AgentreportService', () => {
  let service: AgentreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
