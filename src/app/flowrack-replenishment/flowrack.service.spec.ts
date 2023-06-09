import { TestBed } from '@angular/core/testing';

import { FlowrackService } from './flowrack.service';

describe('FlowrackService', () => {
  let service: FlowrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
