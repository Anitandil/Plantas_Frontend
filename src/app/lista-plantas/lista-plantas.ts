import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Planta } from '../models/planta';
import { PaginaPlantas, ParametrosPlanta, ServicioDatosPlanta } from '../service-datos-planta';

@Component({
  selector: 'lista-plantas',
  standalone: true,
  styleUrl: './lista-plantas.scss',
  templateUrl: './lista-plantas.html',
})
export class ListaPlantas implements OnInit {
  plantas = signal<Planta[]>([]);
  pagina = signal<PaginaPlantas | null>(null);
  cargando = signal(false);
  error = signal<string | null>(null);
  filtros: ParametrosPlanta = {};

  constructor(
    private servicioDatosPlanta: ServicioDatosPlanta,
    private router: Router,
  ) {}

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const page = Number(params.get('page'));
        this.filtros = {
          nombre: params.get('nombre') ?? '',
          clasificacion: params.get('clasificacion') ?? '',
          sortBy: params.get('sortBy') ?? 'id',
          order: params.get('order') ?? 'desc',
          page: Number.isInteger(page) && page > 0 ? page : 1,
        };
        this.buscar();
      });
  }

  buscar(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.servicioDatosPlanta.getPage(this.filtros).subscribe({
      next: (pagina) => {
        const ultimaPagina = Math.max(1, pagina.totalPages);
        if (pagina.page > ultimaPagina) {
          this.router.navigate(['/plantas'], {
            queryParams: { ...this.filtros, page: ultimaPagina },
          });
          return;
        }

        this.plantas.set(pagina.data);
        this.pagina.set(pagina);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.plantas.set([]);
        this.pagina.set(null);
        this.cargando.set(false);
        this.error.set(this.obtenerMensajeError(err));
      },
    });
  }

  cambiarPagina(page: number): void {
    const paginaActual = this.pagina();
    if (!paginaActual || page < 1 || page > paginaActual.totalPages) {
      return;
    }

    this.router.navigate(['/plantas'], {
      queryParams: { ...this.filtros, page },
    });
  }

  editar(id: number): void {
    this.router.navigate(['/plantas/editar', id]);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que querés eliminar esta planta?')) {
      this.servicioDatosPlanta.delete(id).subscribe({
        next: () => this.buscar(),
        error: (err: HttpErrorResponse) => {
          this.error.set(this.obtenerMensajeError(err));
        },
      });
    }
  }

  private obtenerMensajeError(err: HttpErrorResponse): string {
    const message = err.error?.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
    if (Array.isArray(message) && message.length > 0) {
      return message.join('\n');
    }
    return 'No se pudieron cargar las plantas.';
  }
}