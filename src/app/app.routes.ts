import { Routes } from '@angular/router';
import { ListaOrigenes } from './lista-origenes/lista-origenes';
import { ListaPlantas } from './lista-plantas/lista-plantas';
import { FormOrigen } from './form-origen/form-origen';
import { FormPlanta } from './form-planta/form-planta';
import { Resumen } from './resumen/resumen';
import { AcercaDelProyecto } from './acerca-del-proyecto/acerca-del-proyecto';

//asigno una URL a cada componente
export const routes: Routes = [
  { path: '', redirectTo: 'plantas', pathMatch: 'full' },
  { path: 'plantas', component: ListaPlantas },
  { path: 'plantas/crear', component: FormPlanta },
  { path: 'plantas/editar/:id', component: FormPlanta },
  { path: 'resumen', component: Resumen },
  { path: 'acerca-del-proyecto', component: AcercaDelProyecto },
  { path: 'origenes/crear', component: FormOrigen },
  { path: 'origenes', component: ListaOrigenes },
  { path: 'origenes/editar/:id', component: FormOrigen },


  // Redirige a plantas cualquier URL que no coincida con las rutas anteriores.
  { path: '**', redirectTo: 'plantas' },
];
