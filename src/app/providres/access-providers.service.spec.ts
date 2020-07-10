import { TestBed } from '@angular/core/testing';

import { AccessProvidersService } from './access-providers.service';

describe('AccessProvidersService', () => {
  let service: AccessProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
