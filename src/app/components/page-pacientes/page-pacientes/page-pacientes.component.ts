import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Paciente } from '../../../Models/paciente';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ButtonSheetPacienteComponent } from '../../sheets/button-sheet-paciente/button-sheet-paciente.component';
import { AuthService } from '../../../services/auth.service';
import { operationRequest } from '../../../Models/operation-request';
import { environment } from '../../../Environments/environment';
import { SupabaseService } from '../../../services/supabase.service';
@Component({
  selector: 'app-page-pacientes',
  standalone: false,
  templateUrl: './page-pacientes.component.html',
  styleUrl: './page-pacientes.component.css',
})
export class PagePacientesComponent implements OnInit {
  @Input() pacienteGuardado = new EventEmitter<any>();
  @Output() numPacientes: number = 0;
  @Output() listaPacientes: Paciente[] = [];
  constructor(
    private _bottomSheetRef: MatBottomSheet,
    private http: AuthService,
    private supabaseService: SupabaseService
  ) {}
  pacientes: Paciente[] = [
    {
      id: 0,
      apellido: 'Ibañez Toledo',
      direccion: '',
      email: '',
      fecha: '',
      nombre: 'Jose Miguel ',
      notas_medicas: '',
      telefono: '971-149-1315',
    },
  ];

  ngOnInit(): void {
    this.generarListaPacientes();
  }
  async generarListaPacientes() {
    const responsePacientes = await this.supabaseService.supaBase
      .from('paciente')
      .select('*');
    this.listaPacientes = responsePacientes.data ?? [];
    this.listaPacientes.sort((a, b) => {
      const nombreCmp = a.nombre.localeCompare(b.nombre);
      return nombreCmp !== 0 ? nombreCmp : a.apellido.localeCompare(b.apellido);
    });
    this.numPacientes = responsePacientes.data?.length ?? 0;
    
  }
  async agregarPaciente() {
    const ref = await this._bottomSheetRef.open(ButtonSheetPacienteComponent);
    ref.afterDismissed().subscribe((result) => {
      console.log("Paciente agregado:", result);
      if (result) {
        console.log('Paciente agregado:', result);
        this.generarListaPacientes();
      }
    });
  }
}
