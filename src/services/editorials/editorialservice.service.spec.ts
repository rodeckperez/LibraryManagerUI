import { TestBed } from '@angular/core/testing';

import { EditorialserviceService } from './editorialservice.service';

describe('EditorialserviceService', () => {
  let service: EditorialserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorialserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
