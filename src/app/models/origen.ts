export interface Origen {
  id: number;
  region: string;
  clima: string;
}


export type OrigenDatos = Omit<Origen, 'id'>;
//Se define OrigenDatos separado de Origen porque representa los datos que el formulario envía para crear o actualizar un origen.
//  No incluye id, ya que la base de datos lo genera al crear el registro;
// en una actualización, el identificador se envía por separado en la URL. Origen, en cambio, representa el origen ya guardado y sí incluye su id.
