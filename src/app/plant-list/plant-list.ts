import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'plant-list',
  styleUrl: './plant-list.scss',
  templateUrl: './plant-list.html',
})
export class PlantList {
  plantas = [
    {
      id: 1,
      imagen: '/aspidistra.png',
      nombreCientifico: 'Aspidistra',
      nombreVulgar: 'Aspidistra elatior',
      clasificacion: 'Mata',
      epocaFloracion: 'Otoño',
      origen: 'América',
    },
    {
      id: 2,
      imagen: '/aloe-vera.jpg',
      nombreCientifico: 'Aloe Vera',
      nombreVulgar: 'Aloe Vera',
      clasificacion: 'Arbusto',
      epocaFloracion: 'Primavera',
      origen: 'América',
    },
    {
      id: 3,
      imagen: '/limonero.jpg',
      nombreCientifico: 'Citrus x limon',
      nombreVulgar: 'Limonero',
      clasificacion: 'Árbol',
      epocaFloracion: 'Primavera',
      origen: 'América',
    },
  ];
}
