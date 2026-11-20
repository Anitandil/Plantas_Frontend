import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListaPlantas } from '../lista-plantas/lista-plantas';

@Component({
  selector: 'vista-resultados',
  standalone: true,
  imports: [ListaPlantas],
  templateUrl: './vista-resultados.html',
  styleUrl: './vista-resultados.scss'
})
export class VistaResultados {
  filtros: any = {};

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.filtros = {
          nombre: params.get('nombre') ?? '',
          clasificacion: params.get('clasificacion') ?? '',
          sortBy: params.get('sortBy') ?? 'id',
          order: params.get('order') ?? 'asc',
        };
      });
  }
}