import { Component, signal } from '@angular/core';

import { VistaBusqueda } from './vista-busqueda/vista-busqueda';
import { VistaResultados } from './vista-resultados/vista-resultados';

@Component({
  imports: [VistaResultados, VistaBusqueda],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly anio = signal(new Date().getFullYear()); //usada en el footer
  vista = 'plantas'; // 'plantas' | 'origenes'
  filtros: any = {};
}