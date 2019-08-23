import { TestBed } from '@angular/core/testing';

import { ItemsDetailService } from './items-detail.service';

describe('ItemsDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemsDetailService = TestBed.get(ItemsDetailService);
    expect(service).toBeTruthy();
  });
});
