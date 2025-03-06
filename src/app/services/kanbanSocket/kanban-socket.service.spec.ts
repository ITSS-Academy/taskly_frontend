import { TestBed } from '@angular/core/testing';

import { KanbanSocketService } from './kanban-socket.service';

describe('KanbanSocketService', () => {
  let service: KanbanSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanbanSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
