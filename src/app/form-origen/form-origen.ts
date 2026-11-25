import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceDatosOrigen } from '../service-datos-origen';
import { OrigenDatos } from '../models/origen';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  imports: [ FormsModule, RouterLink ],
  selector: 'app-form-origen',
  styleUrl: './form-origen.scss',
  templateUrl: './form-origen.html',
})
export class FormOrigen implements OnInit {
  nuevoOrigen: OrigenDatos = { region: '', clima: '' };
  idOrigen?: number;

  constructor(
    private datosOrigen: ServiceDatosOrigen,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.idOrigen = Number(id);
    this.datosOrigen.getById(this.idOrigen).subscribe({
      next: (origen) => {
        this.nuevoOrigen = { region: origen.region, clima: origen.clima };
        this.changeDetector.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        window.alert(this.obtenerMensajeError(err, 'No se pudo cargar el origen.'));
      },
    });
  }

  guardar() {
  if (this.idOrigen) {
    this.datosOrigen.update(this.idOrigen, this.nuevoOrigen).subscribe({
      next: () => {
        window.alert('Origen modificado correctamente.');
        this.router.navigate(['/origenes']);
      },
      error: (err: HttpErrorResponse) => {
        window.alert(this.obtenerMensajeError(err, 'No se pudo modificar el origen.'));
      },
    });
  } else {
    this.datosOrigen.create(this.nuevoOrigen).subscribe({
      next: () => {
        window.alert('Origen creado correctamente.');
        this.router.navigate(['/origenes']);
      },
      error: (err: HttpErrorResponse) => {
        window.alert(this.obtenerMensajeError(err, 'No se pudo crear el origen.'));
      },
    });
  }
  }

  private obtenerMensajeError(
    err: HttpErrorResponse,
    mensajePredeterminado: string,
  ): string {
    const message = err.error?.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
    if (Array.isArray(message) && message.length > 0) {
      return message.join('\n');
    }
    return mensajePredeterminado;
  }
}