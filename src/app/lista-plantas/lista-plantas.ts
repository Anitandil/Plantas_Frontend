import { Component } from '@angular/core';
import { Planta } from '../models/planta';

@Component({
  imports: [],
  selector: 'lista-plantas',
  styleUrl: './lista-plantas.scss',
  templateUrl: './lista-plantas.html',
})
export class ListaPlantas {
  plantas: Planta[]
  = [  {
    id: 1,
    imagen: '/aspidistra.png',
    nombreCientifico: 'Aspidistra elatior',
    nombreVulgar: 'Aspidistra',
    clasificacion: 'Mata',
    epocaFloracion: 'Otoño',
    origen: {
      id: 1,
      region: 'Asia',
      clima: 'Tropical'
    },
    origenId: 1
  },
    {
      id: 2,
      imagen: '/aloe-vera.jpg',
      nombreCientifico: 'Aloe Vera',
      nombreVulgar: 'Aloe Vera',
      clasificacion: 'Arbusto',
      epocaFloracion: 'Primavera',
      origen: {
        id: 2,
        region: 'África',
        clima: 'Semiárido'
      },
      origenId: 2 
    },
    {
      id: 3,
      imagen: '/limonero.jpg',
      nombreCientifico: 'Citrus x limon',
      nombreVulgar: 'Limonero',
      clasificacion: 'Arbol',
      epocaFloracion: 'Primavera',
      origen: {
        id: 3,
        region: 'América',
        clima: 'Templado'
      },
      origenId: 3
    },
  ];
}
