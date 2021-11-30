import { TestBed } from '@angular/core/testing';

import { AgentBookTicketService } from './agent-book-ticket.service';

describe('AgentBookTicketService', () => {
  let service: AgentBookTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentBookTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
