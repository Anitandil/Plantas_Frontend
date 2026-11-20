import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Planta } from './models/planta';

@Injectable({ providedIn: 'root' })
export class ServicioDatosPlanta {
  private readonly apiUrl = 'http://localhost:3000/planta';

  constructor(private http: HttpClient) {}

  getAll(filtros?: any): Observable<Planta[]> {
    const params: any = {};

    if (filtros?.nombre?.trim()) {
      params.nombre = filtros.nombre.trim();
    }

    if (filtros?.clasificacion?.trim()) {
      params.clasificacion = filtros.clasificacion.trim();
    }

    if (filtros?.sortBy?.trim()) {
      params.sortBy = filtros.sortBy.trim();
    }

    if (filtros?.order?.trim()) {
      params.order = filtros.order.trim();
    }

    return this.http
      .get<{ data: Planta[] }>(this.apiUrl, { params })
      .pipe(map((res) => res.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}