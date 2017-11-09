import { TestBed, inject } from '@angular/core/testing';

import { FormasPagosService } from './formaspagos.service';

describe('FormaspagosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormasPagosService]
    });
  });

  it('should be created', inject([FormasPagosService], (service: FormasPagosService) => {
    expect(service).toBeTruthy();
  }));
});
