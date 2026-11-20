import { Component, OnInit, signal, Input, OnChanges } from '@angular/core';
import { Planta } from '../models/planta';
import { ServicioDatosPlanta } from '../service-datos-planta';

@Component({
  selector: 'lista-plantas',
  styleUrl: './lista-plantas.scss',
  templateUrl: './lista-plantas.html',
})
export class ListaPlantas implements OnInit, OnChanges {
  plantas = signal<Planta[]>([]);
  @Input() filtros: any = {};

  constructor(private servicioDatosPlanta: ServicioDatosPlanta) {}

  ngOnInit(): void {
    this.buscar();
  }

  ngOnChanges() {
    this.buscar();
  }

  buscar() {
    this.servicioDatosPlanta.getAll(this.filtros).subscribe((plantas) => {
      this.plantas.set(plantas);
    });
  }

  editar(id: number) {
    // Lógica para editar la planta
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que querés eliminar esta planta?')) {
      this.servicioDatosPlanta.delete(id).subscribe({
        next: () => this.buscar(),
        error: (err) => console.error('Error al eliminar', err),
      });
    }
  }
}