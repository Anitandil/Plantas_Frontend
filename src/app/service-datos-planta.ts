import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, expand, reduce } from 'rxjs';
import { Planta, PlantaDatos } from './models/planta';

export interface ParametrosPlanta {
  nombre?: string;
  clasificacion?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export interface PaginaPlantas {
  data: Planta[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class ServicioDatosPlanta {
  private readonly apiUrl = 'http://localhost:3000/planta';

  constructor(private http: HttpClient) {}

  getAll(filtros?: ParametrosPlanta): Observable<Planta[]> {
    return this.getPage({ ...filtros, page: 1 }).pipe(
      expand((pagina) =>
        pagina.page < pagina.totalPages
          ? this.getPage({ ...filtros, page: pagina.page + 1, limit: pagina.limit })
          : EMPTY,
      ),
      reduce((plantas, pagina) => plantas.concat(pagina.data), [] as Planta[]),
    );
  }

  getPage(filtros?: ParametrosPlanta): Observable<PaginaPlantas> {
    const params: Record<string, string | number> = {};

    if (filtros?.nombre?.trim()) {
      params['nombre'] = filtros.nombre.trim();
    }

    if (filtros?.clasificacion?.trim()) {
      params['clasificacion'] = filtros.clasificacion.trim();
    }

    if (filtros?.sortBy?.trim()) {
      params['sortBy'] = filtros.sortBy.trim();
    }

    if (filtros?.order?.trim()) {
      params['order'] = filtros.order.trim();
    }

    if (filtros?.page !== undefined) {
      params['page'] = filtros.page;
    }

    if (filtros?.limit !== undefined) {
      params['limit'] = filtros.limit;
    }

    return this.http.get<PaginaPlantas>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Planta> {
    return this.http.get<Planta>(`${this.apiUrl}/${id}`);
  }

  create(planta: PlantaDatos): Observable<Planta> {
    return this.http.post<Planta>(this.apiUrl, planta);
  }

  update(id: number, planta: PlantaDatos): Observable<Planta> {
    return this.http.patch<Planta>(`${this.apiUrl}/${id}`, planta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}