import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Origen } from '../models/origen';
import { Clasificacion, Planta, PlantaDatos } from '../models/planta';
import { ServiceDatosOrigen } from '../service-datos-origen';
import { ServicioDatosPlanta } from '../service-datos-planta';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-form-planta',
  styleUrl: './form-planta.scss',
  templateUrl: './form-planta.html',
})
export class FormPlanta implements OnInit {
  readonly clasificaciones: Clasificacion[] = ['Arbol', 'Arbusto', 'Mata', 'Hierba'];
  nuevoPlanta: {
    nombreCientifico: string;
    nombreVulgar: string;
    clasificacion: Clasificacion | '';
    epocaFloracion: string;
    imagen: string;
    origenId: number | null;
  } = {
    nombreCientifico: '',
    nombreVulgar: '',
    clasificacion: '',
    epocaFloracion: '',
    imagen: '',
    origenId: null,
  };
  origenes: Origen[] = [];
  idPlanta?: number;
  guardando = false;
  mensajeError: string | null = null;

  constructor(
    private servicioPlanta: ServicioDatosPlanta,
    private servicioOrigen: ServiceDatosOrigen,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.servicioOrigen.getAll().subscribe({
      next: (origenes) => {
        this.origenes = origenes;
        this.changeDetector.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        window.alert(this.obtenerMensajeError(err, 'No se pudieron cargar los orígenes.'));
      },
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }

    const idPlanta = Number(id);
    if (!Number.isInteger(idPlanta) || idPlanta <= 0) {
      window.alert('El identificador de la planta no es válido.');
      this.router.navigate(['/plantas']);
      return;
    }

    this.idPlanta = idPlanta;
    this.servicioPlanta.getById(idPlanta).subscribe({
      next: (planta: Planta) => {
        this.nuevoPlanta = {
          nombreCientifico: planta.nombreCientifico ?? '',
          nombreVulgar: planta.nombreVulgar,
          clasificacion: planta.clasificacion,
          epocaFloracion: planta.epocaFloracion ?? '',
          imagen: planta.imagen ?? '',
          origenId: planta.origenId,
        };
        this.changeDetector.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        window.alert(this.obtenerMensajeError(err, 'No se pudo cargar la planta.'));
      },
    });
  }

  guardar(): void {
    const { nombreCientifico, nombreVulgar, clasificacion, origenId } = this.nuevoPlanta;
    if (
      this.guardando
      || !nombreCientifico.trim()
      || !nombreVulgar.trim()
      || !clasificacion
      || !origenId
    ) {
      return;
    }

    this.mensajeError = null;
    const planta: PlantaDatos = {
      nombreCientifico: nombreCientifico.trim(),
      nombreVulgar: nombreVulgar.trim(),
      clasificacion,
      epocaFloracion: this.nuevoPlanta.epocaFloracion.trim() || undefined,
      imagen: this.nuevoPlanta.imagen.trim() || undefined,
      origenId,
    };

    this.guardando = true;
    const solicitud = this.idPlanta
      ? this.servicioPlanta.update(this.idPlanta, planta)
      : this.servicioPlanta.create(planta);

    solicitud.subscribe({
      next: () => {
        window.alert(this.idPlanta ? 'Planta modificada correctamente.' : 'Planta creada correctamente.');
        this.router.navigate(['/plantas']);
      },
      error: (err: HttpErrorResponse) => {
        this.guardando = false;
        const accion = this.idPlanta ? 'modificar' : 'crear';
        this.mensajeError = this.obtenerMensajeError(err, `No se pudo ${accion} la planta.`);
        this.changeDetector.markForCheck();
      },
    });
  }

  private obtenerMensajeError(err: HttpErrorResponse, mensajePredeterminado: string): string {
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
