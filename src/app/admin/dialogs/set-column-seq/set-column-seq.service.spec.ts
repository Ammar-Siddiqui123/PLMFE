import { TestBed } from '@angular/core/testing';

import { SetColumnSeqService } from './set-column-seq.service';

describe('SetColumnSeqService', () => {
  let service: SetColumnSeqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetColumnSeqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
