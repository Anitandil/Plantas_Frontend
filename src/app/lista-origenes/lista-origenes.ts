import { Component, OnInit, signal } from '@angular/core';
import { Origen } from '../models/origen';
import { ServiceDatosOrigen } from '../service-datos-origen';
import { Router } from '@angular/router';

@Component({
  selector: 'lista-origenes',
  standalone: true,
  imports: [],
  templateUrl: './lista-origenes.html',
  styleUrl: './lista-origenes.scss',
})
export class ListaOrigenes implements OnInit {
  origenes = signal<Origen[]>([]);

  constructor(
  private datosOrigen: ServiceDatosOrigen,
  private router: Router
) {}

  ngOnInit(): void {
    this.cargarOrigenes();
  }

  private cargarOrigenes(): void {
    this.datosOrigen.getAll().subscribe({
      next: (origenes: Origen[]) => {
        this.origenes.set(origenes);
      },
      error: (err) => {
        console.error('Error cargando orígenes:', err);
      },
    });
  }

  editar(id: number) {
    this.router.navigate(['/origenes/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que querés eliminar este origen?')) {
      this.datosOrigen.delete(id).subscribe({
        next: () => {
          this.cargarOrigenes();
        },
        error: (err) => {
          console.error('Error al eliminar el origen:', err);
        },
      });
    }
  }
}
