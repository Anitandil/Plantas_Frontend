import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Clasificacion } from '../models/planta';
import { ServiceDatosOrigen } from '../service-datos-origen';
import { ServicioDatosPlanta } from '../service-datos-planta';

interface ResumenCatalogo {
  totalPlantas: number;
  totalOrigenes: number;
  clasificaciones: { nombre: Clasificacion; cantidad: number; porcentaje: number }[];
}

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.html',
})
export class Resumen implements OnInit {
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);
  readonly datos = signal<ResumenCatalogo | null>(null);

  private readonly clasificaciones: Clasificacion[] = ['Arbol', 'Arbusto', 'Mata', 'Hierba'];

  constructor(
    private readonly servicioPlanta: ServicioDatosPlanta,
    private readonly servicioOrigen: ServiceDatosOrigen,
  ) {}

  ngOnInit(): void {
    forkJoin({
      plantas: this.servicioPlanta.getAll(),
      origenes: this.servicioOrigen.getAll(),
    }).subscribe({
      next: ({ plantas, origenes }) => {
        this.datos.set({
          totalPlantas: plantas.length,
          totalOrigenes: origenes.length,
          clasificaciones: this.clasificaciones.map((nombre) => {
            const cantidad = plantas.filter((planta) => planta.clasificacion === nombre).length;
            return {
              nombre,
              cantidad,
              porcentaje: plantas.length === 0
                ? 0
                : Math.round((cantidad / plantas.length) * 100),
            };
          }),
        });
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(this.obtenerMensajeError(err));
        this.cargando.set(false);
      },
    });
  }

  private obtenerMensajeError(err: HttpErrorResponse): string {
    const message = err.error?.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
    if (Array.isArray(message) && message.length > 0) {
      return message.join('\n');
    }
    return 'No se pudo cargar el resumen del catálogo.';
  }
}
