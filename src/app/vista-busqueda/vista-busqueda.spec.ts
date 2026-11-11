import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaBusqueda } from './vista-busqueda';

describe('VistaBusqueda', () => {
  let component: VistaBusqueda;
  let fixture: ComponentFixture<VistaBusqueda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaBusqueda],
    }).compileComponents();

    fixture = TestBed.createComponent(VistaBusqueda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
