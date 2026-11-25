import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Origen, OrigenDatos } from './models/origen';


@Injectable({ providedIn: 'root' })
export class ServiceDatosOrigen {
  private readonly apiUrl = 'https://plantas-backend-al2l.onrender.com/origen';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Origen[]> {
    return this.http.get<Origen[]>(this.apiUrl).pipe(
      map((origenes) =>
        [...origenes].sort((a, b) =>
          a.region.localeCompare(b.region, 'es', { sensitivity: 'base' }),
        ),
      ),
    );
  }

  getById(id: number): Observable<Origen> {
    return this.http.get<Origen>(`${this.apiUrl}/${id}`);
  }

  create(origen: OrigenDatos): Observable<Origen> {
    return this.http.post<Origen>(this.apiUrl, origen);
  }

  update(id: number, origen: OrigenDatos): Observable<Origen> {
    return this.http.patch<Origen>(`${this.apiUrl}/${id}`, origen);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}