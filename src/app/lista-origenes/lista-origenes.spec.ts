import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ListaOrigenes } from './lista-origenes';

describe('ListaOrigenes', () => {
  let component: ListaOrigenes;
  let fixture: ComponentFixture<ListaOrigenes>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOrigenes],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ListaOrigenes);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders origins returned by the API', async () => {
    fixture.detectChanges();
    httpTestingController
      .expectOne('https://plantas-backend-al2l.onrender.com/origen')
      .flush([{ id: 1, region: 'Sierras', clima: 'Templado' }]);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.origenes()).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('Sierras');
  });
});
