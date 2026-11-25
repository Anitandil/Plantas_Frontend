import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Resumen } from './resumen';

describe('Resumen', () => {
  let fixture: ComponentFixture<Resumen>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resumen],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Resumen);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('shows totals and classification counts from the APIs', async () => {
    fixture.detectChanges();

    httpTestingController
      .expectOne((req) => req.url === 'http://localhost:3000/planta')
      .flush({
        data: [
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
        ],
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    httpTestingController
      .expectOne('http://localhost:3000/origen')
      .flush([{ id: 1, region: 'Europa', clima: 'Templado' }]);

    await fixture.whenStable();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Plantas registradas');
    expect(text).toContain('Orígenes registrados');
    expect(text).toContain('Árbol');
    expect(text).toContain('Arbusto');
    expect(text).toContain('50%');
    expect(text).toContain('2');
    expect(text).toContain('1');
  });
});
