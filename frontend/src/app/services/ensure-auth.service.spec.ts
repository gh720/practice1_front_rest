import { TestBed, inject } from '@angular/core/testing';

import { EnsureAuthService } from './ensure-auth.service';

describe('EnsureAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnsureAuthService]
    });
  });

  it('should be created', inject([EnsureAuthService], (service: EnsureAuthService) => {
    expect(service).toBeTruthy();
  }));
});
