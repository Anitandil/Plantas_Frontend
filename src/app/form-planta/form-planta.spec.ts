import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { FormPlanta } from './form-planta';

describe('FormPlanta', () => {
  let component: FormPlanta;
  let fixture: ComponentFixture<FormPlanta>;
  let httpTestingController: HttpTestingController;
  let routeId: string | null;

  beforeEach(async () => {
    routeId = null;
    await TestBed.configureTestingModule({
      imports: [FormPlanta],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => routeId } } },
        },
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(FormPlanta);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requires a non-blank scientific name', async () => {
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:3000/origen').flush([]);
    await fixture.whenStable();

    const nombreCientifico = fixture.nativeElement.querySelector(
      '#nombreCientifico',
    ) as HTMLInputElement;
    expect(nombreCientifico.required).toBe(true);

    nombreCientifico.value = '   ';
    nombreCientifico.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(nombreCientifico.validity.patternMismatch).toBe(true);
  });

  it('loads the existing plant values into the form when editing', async () => {
    routeId = '7';
    fixture.detectChanges();

    httpTestingController
      .expectOne('http://localhost:3000/origen')
      .flush([{ id: 2, region: 'Patagonia', clima: 'Templado' }]);
    httpTestingController.expectOne('http://localhost:3000/planta/7').flush({
      id: 7,
      nombreCientifico: 'Austrocedrus chilensis',
      nombreVulgar: 'Ciprés de la cordillera',
      clasificacion: 'Arbol',
      epocaFloracion: 'Primavera',
      imagen: 'https://example.com/cipres.jpg',
      origenId: 2,
    });

    await fixture.whenStable();

    expect((fixture.nativeElement.querySelector('#nombreCientifico') as HTMLInputElement).value)
      .toBe('Austrocedrus chilensis');
    expect((fixture.nativeElement.querySelector('#nombreVulgar') as HTMLInputElement).value)
      .toBe('Ciprés de la cordillera');
    expect(component.nuevoPlanta.origenId).toBe(2);
  });

  it('shows the duplicate error again after each create attempt', () => {
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:3000/origen').flush([]);

    component.nuevoPlanta = {
      nombreCientifico: 'Rosa canina',
      nombreVulgar: 'Rosa silvestre',
      clasificacion: 'Arbusto',
      epocaFloracion: '',
      imagen: '',
      origenId: 1,
    };

    component.guardar();
    httpTestingController
      .expectOne('http://localhost:3000/planta')
      .flush(
        { message: 'Ya existe una planta con esos nombres.' },
        { status: 409, statusText: 'Conflict' },
      );
    fixture.detectChanges();

    expect(component.guardando).toBe(false);
    expect(component.nuevoPlanta.nombreCientifico).toBe('Rosa canina');
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent)
      .toContain('Ya existe una planta con esos nombres.');

    component.guardar();
    httpTestingController
      .expectOne('http://localhost:3000/planta')
      .flush(
        { message: 'Ya existe una planta con esos nombres.' },
        { status: 409, statusText: 'Conflict' },
      );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent)
      .toContain('Ya existe una planta con esos nombres.');
  });
});
