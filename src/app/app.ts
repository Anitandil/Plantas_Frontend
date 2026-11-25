import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VistaBusqueda } from './vista-busqueda/vista-busqueda';
import { Footer } from './footer/footer';
import { Header } from './header/header';

@Component({
  imports: [RouterOutlet, VistaBusqueda, Footer, Header],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly anio = signal(new Date().getFullYear()); //usada en el footer
}