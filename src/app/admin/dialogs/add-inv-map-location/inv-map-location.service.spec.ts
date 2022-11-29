import { TestBed } from '@angular/core/testing';

import { InvMapLocationService } from './inv-map-location.service';

describe('InvMapLocationService', () => {
  let service: InvMapLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvMapLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
