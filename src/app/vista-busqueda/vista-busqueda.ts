import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'vista-busqueda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vista-busqueda.html',
  styleUrl: './vista-busqueda.scss'
})
export class VistaBusqueda {
  @Input() vista = 'plantas';
  @Output() vistaCambiada = new EventEmitter<'plantas' | 'origenes'>();
  @Output() filtrosCambiados = new EventEmitter<any>();

  filtros: any = {
    nombreCientifico: '',
    nombreVulgar: '',
    clasificacion: '',
    sortBy: 'id',
    order: 'asc'
  };

  cambiar(vista: 'plantas' | 'origenes') {
    this.vista = vista;
    this.vistaCambiada.emit(vista);
  }

  buscar() {
    this.filtrosCambiados.emit(this.filtros);
  }

  limpiar() {
    this.filtros = {
      nombreCientifico: '',
      nombreVulgar: '',
      clasificacion: '',
      sortBy: 'id',
      order: 'asc'
    };
    this.filtrosCambiados.emit(this.filtros);
  }

  crearNuevo() {
    // acá conectás después el formulario de alta
  }
}