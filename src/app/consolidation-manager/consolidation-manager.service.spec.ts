import { TestBed } from '@angular/core/testing';

import { ConsolidationManagerService } from './consolidation-manager.service';

describe('ConsolidationManagerService', () => {
  let service: ConsolidationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
