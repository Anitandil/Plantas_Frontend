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

  get esVistaOrigenes(): boolean {
    return this.router.url.startsWith('/origenes');
  }

  filtros: any = {
    nombre: '',
    clasificacion: '',
    sortBy: 'id',
    order: 'desc'
  };

  buscar() {
    this.router.navigate(['/plantas'], {
      queryParams: { ...this.filtros, page: 1 },
    });
  }

  limpiar() {
    this.filtros = {
      nombre: '',
      clasificacion: '',
      sortBy: 'id',
      order: 'desc',
      page: 1,
    };
    this.buscar();
  }

  crearNuevo() {
    this.router.navigate(['/plantas/crear']);
  }
}