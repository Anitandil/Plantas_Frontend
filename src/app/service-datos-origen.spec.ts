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

  it('returns origins sorted alphabetically by region', () => {
    const origenes: Origen[] = [
      { id: 1, region: 'Patagonia', clima: 'Frío' },
      { id: 2, region: 'África', clima: 'Tropical' },
      { id: 3, region: 'América del Sur', clima: 'Templado' },
    ];
    let result: Origen[] | undefined;

    service.getAll().subscribe((items) => {
      result = items;
    });
    httpTestingController
      .expectOne('http://localhost:3000/origen')
      .flush(origenes);

    expect(result?.map((origen) => origen.id)).toEqual([2, 3, 1]);
    expect(origenes.map((origen) => origen.id)).toEqual([1, 2, 3]);
  });
});
