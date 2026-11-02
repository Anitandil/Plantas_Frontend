import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPlantas } from './lista-plantas';

describe('ListaPlantas', () => {
  let component: ListaPlantas;
  let fixture: ComponentFixture<ListaPlantas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPlantas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPlantas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
