import { TestBed } from '@angular/core/testing';

import { RequestUtilsService } from './request-utils.service';

describe('RequestUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestUtilsService = TestBed.get(RequestUtilsService);
    expect(service).toBeTruthy();
  });
});
