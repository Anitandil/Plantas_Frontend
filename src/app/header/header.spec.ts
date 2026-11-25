import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the four navigation links', () => {
    fixture.detectChanges();

    const nav = fixture.nativeElement as HTMLElement;
    const links = [...nav.querySelectorAll<HTMLAnchorElement>('.nav-button')]
      .map((link) => link.textContent?.trim());

    expect(links).toEqual(['Plantas', 'Orígenes', 'Resumen', 'Acerca del proyecto']);
  });
});
