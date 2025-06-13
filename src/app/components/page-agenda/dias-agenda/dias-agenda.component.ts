import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-dias-agenda',
  standalone: false,
  templateUrl: './dias-agenda.component.html',
  styleUrl: './dias-agenda.component.css',
})
export class DiasAgendaComponent implements OnInit {
  @Input() porcentaje: number = 0;
  @Input() diaNumero: string = 'Lunes';
  @Input() mes: string = 'Enero';
  @Input() dia: number = 0;
  @Input() anio: number = 2000;
  @Input() diasSemana: string[] = [
    'DOMINGO',
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
  ];
  @Input() meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  @Output() clicked = new EventEmitter<Date>();
  @Input() DiaPorcentaje: { dia: string; porcentaje: number }[] = [];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const fecha: Date = new Date();
    this.cambioFechaTitulo(fecha);
  }

  public onClick(date: Date) {
    this.cambioFechaTitulo(date);
    this.clicked.emit(date);
  }

  public cambioFechaTitulo(date: Date) {
    this.diaNumero = this.diasSemana[date.getDay()];
    this.dia = date.getDate();
    this.mes = this.meses[date.getMonth()];
    this.anio = date.getFullYear();
  }
}
