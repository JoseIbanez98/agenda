import { Component, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../Models/usuario';
import { Cita } from '../../Models/citas';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-odontologo-dashboard',
  standalone: false,
  templateUrl: './odontologo-dashboard.component.html',
  styleUrl: './odontologo-dashboard.component.css',
})
export class OdontologoDashboardComponent implements OnInit {
  @Input() listaCitas: Cita[] = [];
  ListEmpty: boolean = true;
  usuario: Usuario = {
    id: '',
    nombre: '',
    Email: '',
    id_Rol: 0,
  };
  fechaActual: string = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  listaCitasFiltrada: Cita[] = [];
  citasPorDia: number = 0;
  numPacientes:number=0;
  numTratamiento:number=0;
  constructor(private supaBaseService: SupabaseService) {}

  ngOnInit(): void {
    this.generarLista();
    this.numerodePacientes()
    this.numerodeTratamientos()
   
  }

  async generarLista() {
    const session = await this.supaBaseService.getsession();

    const usuario = await this.supaBaseService.supabase
      .from('profiles')
      .select('*')
      .eq('id', session.data.session?.user.id)
      .single();
    this.usuario = usuario.data;

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
    this.citasPorDia = this.listaCitasFiltrada.length;

    if (this.citasPorDia > 0) this.ListEmpty = false;
    else this.ListEmpty = true;
  }
  async numerodePacientes(){
    const pacientes=await this.supaBaseService.supaBase.from('paciente').select('*', { count: 'exact', head: true })
    this.numPacientes=pacientes.count||0

  }

   async numerodeTratamientos(){
    const tratamientos=await this.supaBaseService.supaBase.from('tratamiento').select('*', { count: 'exact', head: true })
    this.numTratamiento=tratamientos.count||0

  }
  filtrarListas() {
    const ahora = new Date();
    this.listaCitasFiltrada =
      this.listaCitas.filter((c) => {
        const hoy = new Date().toLocaleDateString();
        const fechaCita = new Date(c.fecha).toLocaleDateString();
        const [hInicioH, hInicioM] = c.hora_inicio.split(':').map(Number);
        const [hFinH, hFinM] = c.hora_fin.split(':').map(Number);
        const inicio = new Date(c.fecha);
        inicio.setHours(hInicioH, hInicioM, 0, 0);
        const fin = new Date(c.fecha);
        fin.setHours(hFinH, hFinM, 0, 0);
        return fechaCita === hoy && ahora < fin;
      }) ?? [];
  }
}
