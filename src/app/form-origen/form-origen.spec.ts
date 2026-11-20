import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormOrigen } from './form-origen';

describe('FormOrigen', () => {
  let component: FormOrigen;
  let fixture: ComponentFixture<FormOrigen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOrigen],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FormOrigen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
