import { Routes } from '@angular/router';
import { ListaOrigenes } from './lista-origenes/lista-origenes';
import { VistaResultados } from './vista-resultados/vista-resultados';
import { FormOrigen } from './form-origen/form-origen';

//asigno una URL a cada componente
export const routes: Routes = [
  { path: '', redirectTo: 'plantas', pathMatch: 'full' },
  { path: 'plantas', component: VistaResultados },
  { path: 'origenes/crear', component: FormOrigen },
  { path: 'origenes', component: ListaOrigenes },

  // Redirige a plantas cualquier URL que no coincida con las rutas anteriores.
  { path: '**', redirectTo: 'plantas' },
];
