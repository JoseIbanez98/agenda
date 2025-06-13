import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Cita } from '../../../Models/citas';
import { operationRequestCita } from '../../../Models/operation-request';
import { environment } from '../../../Environments/environment';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-page-agenda',
  standalone: false,
  templateUrl: './page-agenda.component.html',
  styleUrl: './page-agenda.component.css',
})
export class PageAgendaComponent implements OnInit {
  listaCitas: Cita[] = [];
  listaCitasFiltrada: Cita[] = [];
  listaPorcentajeDia: number[] | null = null;
  selectedDate: Date = new Date();
  dias: string[] = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
  @Output() porcentaje: number = 0;
  @Output() citasPorDia: number = 0;
  @Output() porcentajes: number[] = [];
  @Output() ListEmpty: boolean = true;
  @Output() diasPorcentaje: { dia: string; porcentaje: number }[] = [];
  constructor(
    private authService: AuthService,
    private supaBaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.generarLista();
  }
  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.filtrarListas();
    this.citasPorDia = this.listaCitasFiltrada.length;
    if (this.citasPorDia > 0) this.ListEmpty = false;
    else this.ListEmpty = true;
  }

  filtrarListas() {
    this.listaCitasFiltrada =
      this.listaCitas.filter(
        (c) =>
          new Date(c.fecha).toLocaleDateString() ===
          new Date(
            this.selectedDate.getFullYear(),
            this.selectedDate.getMonth(),
            this.selectedDate.getDate()
          ).toLocaleDateString()
      ) ?? [];
  }
  generarPorcentajes() {
    const rangoSemanal = this.calcularRangoSemanal(new Date());
    const citasSemanales: Cita[] = this.calcularCitasPorSemana(
      this.listaCitas,
      rangoSemanal
    );
    const conteoPorDia = this.calcularConteoPorDia(citasSemanales);
    this.porcentajes = this.calcularPorcentaSemanal(conteoPorDia);

    this.diasPorcentaje = this.dias.map((dia, i) => ({
      dia: dia,
      porcentaje: this.porcentajes[i],
    }));
  }
  async generarLista() {
    const resCitas = await this.supaBaseService.supaBase
      .from('cita')
      .select('*, paciente(*), profiles(*), tratamiento(*)');

    this.listaCitas =
      resCitas.data?.sort((a, b) => {
        const [h1, m1] = a.hora_inicio.substring(0, 5).split(':').map(Number);
        const [h2, m2] = b.hora_inicio.substring(0, 5).split(':').map(Number);
        return h1 !== h2 ? h1 - h2 : m1 - m2;
      }) || [];
    this.filtrarListas();

    this.generarPorcentajes();

    this.citasPorDia = this.listaCitasFiltrada.length;
    if (this.citasPorDia > 0) this.ListEmpty = false;
    else this.ListEmpty = true;

  }

  calcularPorcentaSemanal(conteoPorDia: number[]): number[] {
    const porcentajes: number[] = [];
    conteoPorDia.forEach((c, index) => {
      porcentajes[index] = (c * 100) / 8;
    });
    return porcentajes;
  }

  calcularCitasPorSemana(
    citas: Cita[],
    limitesSemanal: { sabado: Date; domingo: Date }
  ): Cita[] {
    const citasSemanales = citas.filter(
      (c) =>
        new Date(c.fecha) >= limitesSemanal.domingo &&
        new Date(c.fecha) <= limitesSemanal.sabado
    );

    return citasSemanales;
  }
  calcularConteoPorDia(citas: Cita[]): number[] {
    let conteoPorDia: number[] = [0, 0, 0, 0, 0, 0, 0];
    citas.forEach((c) => {
      const indiceDia = new Date(c.fecha).getDay();
      conteoPorDia[indiceDia] = (conteoPorDia[indiceDia] ?? 0) + 1;
    });

    return conteoPorDia;
  }

  calcularRangoSemanal(today: Date): { domingo: Date; sabado: Date } {
    const diasDesdeDomingo: number = today.getDay();
    let domingo: Date = new Date(today);
    domingo.setDate(today.getDate() - diasDesdeDomingo);

    let sabado: Date = new Date(today);
    sabado.setDate(today.getDate() + (6 - diasDesdeDomingo));
    domingo = new Date(
      domingo.getFullYear(),
      domingo.getMonth(),
      domingo.getDate()
    );
    sabado = new Date(
      sabado.getFullYear(),
      sabado.getMonth(),
      sabado.getDate()
    );
    return { domingo, sabado };
  }
}
