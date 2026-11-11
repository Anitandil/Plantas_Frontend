import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaOrigenes } from './lista-origenes';

describe('ListaOrigenes', () => {
  let component: ListaOrigenes;
  let fixture: ComponentFixture<ListaOrigenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOrigenes],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaOrigenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
