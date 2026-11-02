import { Origen } from './origen';

export type Clasificacion = 'Arbol' | 'Arbusto' | 'Mata' | 'Hierba';

export interface Planta {
  id: number;
  nombreCientifico: string;
  nombreVulgar: string;
  clasificacion: Clasificacion;
  epocaFloracion?: string;
  imagen?: string;
  origenId: number;
  origen?: Origen;
}
