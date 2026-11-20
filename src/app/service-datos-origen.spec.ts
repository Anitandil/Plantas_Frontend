import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Origen } from './models/origen';
import { ServiceDatosOrigen } from './service-datos-origen';

describe('ServiceDatosOrigen', () => {
  let service: ServiceDatosOrigen;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ServiceDatosOrigen);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns the origins from the API', () => {
    const origen: Origen = { id: 1, region: 'Sierras', clima: 'Templado' };
    let result: Origen[] | undefined;

    service.getAll().subscribe((origenes) => {
      result = origenes;
    });
    httpTestingController
      .expectOne('http://localhost:3000/origen')
      .flush([origen]);

    expect(result).toEqual([origen]);
  });
});
