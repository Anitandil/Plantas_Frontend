import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Planta } from '../models/planta';
import { ListaPlantas } from './lista-plantas';

describe('ListaPlantas', () => {
  let component: ListaPlantas;
  let fixture: ComponentFixture<ListaPlantas>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPlantas],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ListaPlantas);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders plants returned by the API', () => {
    const planta: Planta = {
      id: 1,
      nombreCientifico: 'Monstera deliciosa',
      nombreVulgar: 'Monstera',
      clasificacion: 'Mata',
      origenId: 1,
    };

    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:3000/planta').flush({ data: [planta] });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(1);
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('Monstera');
  });
});
