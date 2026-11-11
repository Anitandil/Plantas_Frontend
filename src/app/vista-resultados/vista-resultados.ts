import { Component, Input } from '@angular/core';
import { ListaPlantas } from '../lista-plantas/lista-plantas';

@Component({
  selector: 'vista-resultados',
  standalone: true,
  imports: [ListaPlantas],
  templateUrl: './vista-resultados.html',
  styleUrl: './vista-resultados.scss'
})
export class VistaResultados {
  @Input() vista = 'plantas';
  @Input() filtros: any = {};
}