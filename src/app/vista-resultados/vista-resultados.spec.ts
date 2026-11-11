import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaResultados } from './vista-resultados';

describe('VistaResultados', () => {
  let component: VistaResultados;
  let fixture: ComponentFixture<VistaResultados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaResultados],
    }).compileComponents();

    fixture = TestBed.createComponent(VistaResultados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
