import { TestBed } from '@angular/core/testing';

import { InventoryMapService } from './inventory-map.service';

describe('InventoryMapService', () => {
  let service: InventoryMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
