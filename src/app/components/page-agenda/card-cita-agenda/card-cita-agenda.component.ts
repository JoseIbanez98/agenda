import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cita } from '../../../Models/citas';
import { empty } from 'rxjs';
import { SheetbottomService } from '../../../services/sheetbottom.service';
import { SheetBottom } from '../../../Models/sheetBottom';
import { SheetBottomAddCitaComponent } from '../../sheets/sheet-bottom-add-cita/sheet-bottom-add-cita.component';

@Component({
  selector: 'app-card-cita-agenda',
  standalone: false,
  templateUrl: './card-cita-agenda.component.html',
  styleUrl: './card-cita-agenda.component.css',
})
export class CardCitaAgendaComponent implements OnInit {
  @Output() citaGuardada = new EventEmitter<any>();
  @Input() dataCita: Cita = {
    id: 0,
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    paciente: {
      id: 0,
      apellido: '',
      direccion: '',
      email: '',
      fecha: '',
      nombre: '',
      notas_medicas: '',
      telefono: '',
    },
    profiles: {
      id: '',
      nombre: '',
      email: '',
    },
    tratamiento: {
      id: 0,
      id_Odontologo: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
    }
  };
  esActual: boolean = false;
  duracion: number = 0;

  constructor(private sheetBottomService: SheetbottomService) {}
  ngOnInit(): void {
    this.verificarHoraActual();
    setInterval(() => this.verificarHoraActual(), 60000);
  }

  verificarHoraActual(): void {
    const ahora = new Date();
    const [hInicio, mInicio] = this.dataCita?.hora_inicio
      ?.split(':')
      .map(Number) ?? [0, 0];
    const [hFin, mFin] = this.dataCita?.hora_fin?.split(':').map(Number) ?? [
      0, 0,
    ];
    const inicio = new Date();
    inicio.setHours(hInicio, mInicio, 0, 0);

    const fin = new Date();
    fin.setHours(hFin, mFin, 0, 0);

    this.esActual = ahora >= inicio && ahora < fin;
  }
  async abrirEditoCitas(cita: Cita) {

    const shetbotom: SheetBottom = {
      fecha: cita.fecha,
      hora_inicio: cita.hora_inicio,
      hora_fin: cita.hora_fin,
      pacientes: [cita.paciente],
      asistentes: [cita.profiles],
      tratamientos: [cita.tratamiento],
      accion: 2,
      id: cita.id,
    };
    const ref = await this.sheetBottomService.openSheet(
      SheetBottomAddCitaComponent,
      shetbotom
    );
    ref.afterDismissed().subscribe((res) => {
      if (res) {
        this.citaGuardada.emit();

      }
    });
  }
}
