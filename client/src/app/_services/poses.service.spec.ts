import { TestBed } from '@angular/core/testing';

import { PosesService } from './poses.service';

describe('PosesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosesService = TestBed.get(PosesService);
    expect(service).toBeTruthy();
  });
});
