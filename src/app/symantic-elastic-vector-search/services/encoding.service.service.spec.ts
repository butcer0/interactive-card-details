import { TestBed } from '@angular/core/testing';

import { EncodingServiceService } from './encoding.service.service';

describe('EncodingServiceService', () => {
  let service: EncodingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncodingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
