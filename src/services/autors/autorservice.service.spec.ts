import { TestBed } from '@angular/core/testing';

import { AutorserviceService } from './autorservice.service';

describe('AutorserviceService', () => {
  let service: AutorserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
