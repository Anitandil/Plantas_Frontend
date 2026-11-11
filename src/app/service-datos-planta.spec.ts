import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ServicioDatosPlanta } from './service-datos-planta';

describe('DatosPlanta', () => {
  let service: ServicioDatosPlanta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ServicioDatosPlanta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
