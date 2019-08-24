import { TestBed } from '@angular/core/testing';

import { SpareService } from './spare.service';

describe('SpareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpareService = TestBed.get(SpareService);
    expect(service).toBeTruthy();
  });
});
