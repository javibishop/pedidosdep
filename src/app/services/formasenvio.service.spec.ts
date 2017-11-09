import { TestBed, inject } from '@angular/core/testing';

import { FormaenvioService } from './formaenvio.service';

describe('FormaenvioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormaenvioService]
    });
  });

  it('should be created', inject([FormaenvioService], (service: FormaenvioService) => {
    expect(service).toBeTruthy();
  }));
});
