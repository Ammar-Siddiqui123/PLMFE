import { TestBed } from '@angular/core/testing';

import { AdjustQuantityService } from './adjust-quantity.service';

describe('InvMapLocationService', () => {
  let service: AdjustQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjustQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
