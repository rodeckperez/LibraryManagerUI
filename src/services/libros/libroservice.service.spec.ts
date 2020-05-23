import { TestBed } from '@angular/core/testing';

import { LibroserviceService } from './libroservice.service';

describe('LibroserviceService', () => {
  let service: LibroserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
