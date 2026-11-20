import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceDatosOrigen } from '../service-datos-origen';
import { Origen, OrigenDatos } from '../models/origen';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ FormsModule, RouterLink ],
  selector: 'app-form-origen',
  styleUrl: './form-origen.scss',
  templateUrl: './form-origen.html',
})
export class FormOrigen {
  nuevoOrigen: OrigenDatos = { region: '', clima: '' };

  constructor(private datosOrigen: ServiceDatosOrigen) {}

  crear() {
    this.datosOrigen.create(this.nuevoOrigen).subscribe(() => {
      // recargá lista o avisá que se guardó
    });

  }
}