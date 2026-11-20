import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Origen, OrigenDatos } from './models/origen';


@Injectable({ providedIn: 'root' })
export class ServiceDatosOrigen {
  private readonly apiUrl = 'http://localhost:3000/origen';

  constructor(private http: HttpClient) {}

 getAll(): Observable<Origen[]> {
  return this.http.get<Origen[]>(this.apiUrl);
}
  create(origen: OrigenDatos): Observable<Origen> {
    return this.http.post<{ data: Origen }>(this.apiUrl, origen).pipe(map((res) => res.data));
  }

  update(id: number, origen: OrigenDatos): Observable<Origen> {
    return this.http.patch<{ data: Origen }>(`${this.apiUrl}/${id}`, origen).pipe(map((res) => res.data));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}