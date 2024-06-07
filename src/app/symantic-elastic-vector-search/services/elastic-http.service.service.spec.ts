import { TestBed } from '@angular/core/testing';

import { ElasticHttpServiceService } from './elastic-http.service.service';

describe('ElasticHttpServiceService', () => {
  let service: ElasticHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElasticHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
