import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VistaBusqueda } from './vista-busqueda';

describe('VistaBusqueda', () => {
  let component: VistaBusqueda;
  let fixture: ComponentFixture<VistaBusqueda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaBusqueda],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(VistaBusqueda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
