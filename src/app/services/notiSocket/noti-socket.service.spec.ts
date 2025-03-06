import { TestBed } from '@angular/core/testing';

import { NotiSocketService } from './noti-socket.service';

describe('NotiSocketService', () => {
  let service: NotiSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotiSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
