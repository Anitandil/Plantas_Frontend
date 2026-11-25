import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Planta } from '../models/planta';
import { ListaPlantas } from './lista-plantas';

describe('ListaPlantas', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'plantas', component: ListaPlantas }]),
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('reads filters from the route and renders plants returned by the API', async () => {
    const planta: Planta = {
      id: 1,
      nombreCientifico: 'Monstera deliciosa',
      nombreVulgar: 'Monstera',
      clasificacion: 'Mata',
      origenId: 1,
    };

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/plantas?nombre=Monstera&clasificacion=Mata&page=1', ListaPlantas);

    httpTestingController
      .expectOne(
        (req) =>
          req.url === 'http://localhost:3000/planta' &&
          req.params.get('nombre') === 'Monstera' &&
          req.params.get('clasificacion') === 'Mata' &&
          req.params.get('page') === '1' &&
          req.params.get('sortBy') === 'id' &&
          req.params.get('order') === 'desc',
      )
      .flush({ data: [planta], total: 1, page: 1, limit: 10, totalPages: 1 });
    harness.detectChanges();

    const renderedList = harness.routeNativeElement;
    expect(renderedList?.querySelectorAll('tbody tr').length).toBe(1);
    expect(renderedList?.querySelector('tbody')?.textContent).toContain('Monstera');
    expect(renderedList?.querySelector('.plant-image-placeholder')?.textContent?.trim())
      .toBe('Sin imagen');
    expect(renderedList?.querySelector('tbody img')).toBeNull();
    expect(renderedList?.textContent).toContain('Página 1 de 1');
  });
});
