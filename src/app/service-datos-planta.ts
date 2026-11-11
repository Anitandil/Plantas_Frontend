import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Planta } from './models/planta';

@Injectable({ providedIn: 'root' })
export class ServicioDatosPlanta {
  private readonly apiUrl = 'http://localhost:3000/planta';

  constructor(private http: HttpClient) {}

  getAll(filtros?: any): Observable<Planta[]> {
    return this.http
      .get<{ data: Planta[] }>(this.apiUrl, { params: filtros })
      .pipe(map((res) => res.data));
  }
}