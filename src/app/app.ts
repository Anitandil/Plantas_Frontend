import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VistaBusqueda } from './vista-busqueda/vista-busqueda';

@Component({
  imports: [RouterOutlet, VistaBusqueda],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly anio = signal(new Date().getFullYear()); //usada en el footer
}