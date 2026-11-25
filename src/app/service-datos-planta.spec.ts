import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PaginaPlantas, ServicioDatosPlanta } from './service-datos-planta';
import { Planta, PlantaDatos } from './models/planta';

describe('DatosPlanta', () => {
  let service: ServicioDatosPlanta;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ServicioDatosPlanta);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads one plant by id', () => {
    const planta: Planta = {
      id: 1,
      nombreCientifico: 'Monstera deliciosa',
      nombreVulgar: 'Costilla de Adán',
      clasificacion: 'Mata',
      origenId: 2,
    };

    service.getById(1).subscribe((result) => {
      expect(result).toEqual(planta);
    });

    httpTestingController
      .expectOne('https://plantas-backend-al2l.onrender.com/planta/1')
      .flush(planta);
  });

  it('loads the requested page with its filters', () => {
    const pagina: PaginaPlantas = {
      data: [],
      total: 25,
      page: 2,
      limit: 10,
      totalPages: 3,
    };

    service
      .getPage({
        nombre: 'rosa',
        clasificacion: 'Arbusto',
        sortBy: 'id',
        order: 'desc',
        page: 2,
        limit: 10,
      })
      .subscribe((result) => {
        expect(result).toEqual(pagina);
      });

    const request = httpTestingController.expectOne(
      (req) =>
        req.url === 'https://plantas-backend-al2l.onrender.com/planta' &&
        req.params.get('nombre') === 'rosa' &&
        req.params.get('clasificacion') === 'Arbusto' &&
        req.params.get('sortBy') === 'id' &&
        req.params.get('order') === 'desc' &&
        req.params.get('page') === '2' &&
        req.params.get('limit') === '10',
    );
    request.flush(pagina);
  });

  it('loads every page when requesting all plants', () => {
    const plantas: Planta[] = [
      {
        id: 1,
        nombreCientifico: 'Malus domestica',
        nombreVulgar: 'Manzano',
        clasificacion: 'Arbol',
        origenId: 1,
      },
      {
        id: 2,
        nombreCientifico: 'Rosa canina',
        nombreVulgar: 'Rosa silvestre',
        clasificacion: 'Arbusto',
        origenId: 1,
      },
    ];

    service.getAll({ limit: 1 }).subscribe((result) => {
      expect(result).toEqual(plantas);
    });

    httpTestingController
      .expectOne((req) => req.params.get('page') === '1' && req.params.get('limit') === '1')
      .flush({ data: [plantas[0]], total: 2, page: 1, limit: 1, totalPages: 2 });
    httpTestingController
      .expectOne((req) => req.params.get('page') === '2' && req.params.get('limit') === '1')
      .flush({ data: [plantas[1]], total: 2, page: 2, limit: 1, totalPages: 2 });
  });

  it('creates and updates plants', () => {
    const datos: PlantaDatos = {
      nombreCientifico: 'Monstera deliciosa',
      nombreVulgar: 'Costilla de Adán',
      clasificacion: 'Mata',
      origenId: 2,
    };

    service.create(datos).subscribe();
    const crear = httpTestingController.expectOne('https://plantas-backend-al2l.onrender.com/planta');
    expect(crear.request.method).toBe('POST');
    expect(crear.request.body).toEqual(datos);
    crear.flush({ id: 1, ...datos });

    service.update(1, datos).subscribe();
    const actualizar = httpTestingController.expectOne('https://plantas-backend-al2l.onrender.com/planta/1');
    expect(actualizar.request.method).toBe('PATCH');
    expect(actualizar.request.body).toEqual(datos);
    actualizar.flush({ id: 1, ...datos });
  });
});
