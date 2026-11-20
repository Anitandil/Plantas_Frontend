import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'vista-busqueda',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './vista-busqueda.html',
  styleUrl: './vista-busqueda.scss'
})
export class VistaBusqueda {
  private readonly router = inject(Router);

  get esVistaPlantas(): boolean {
    return this.router.url.startsWith('/plantas');
  }

  filtros: any = {
    nombre: '',
    clasificacion: '',
    sortBy: 'id',
    order: 'asc'
  };

  buscar() {
    this.router.navigate(['/plantas'], { queryParams: this.filtros });
  }

  limpiar() {
    this.filtros = {
      nombre: '',
      clasificacion: '',
      sortBy: 'id',
      order: 'asc'
    };
    this.buscar();
  }

  crearNuevo() {
    // acá conectás después el formulario de alta
  }
}