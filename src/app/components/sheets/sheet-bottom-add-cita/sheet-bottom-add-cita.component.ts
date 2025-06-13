import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../Environments/environment';
import { operationRequest } from '../../../Models/operation-request';
import { Paciente } from '../../../Models/paciente';
import { Usuario } from '../../../Models/usuario';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tratamiento } from '../../../Models/tratamiento';
import { Cita } from '../../../Models/citas';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SheetBottom } from '../../../Models/sheetBottom';
import { finalize, tap } from 'rxjs';
import { SheetbottomService } from '../../../services/sheetbottom.service';
import { SupabaseService } from '../../../services/supabase.service';
import { Asistente } from '../../../Models/asistente';
@Component({
  selector: 'app-sheet-bottom-add-cita',
  standalone: false,
  templateUrl: './sheet-bottom-add-cita.component.html',
  styleUrl: './sheet-bottom-add-cita.component.css',
})
export class SheetBottomAddCitaComponent implements OnInit {
  citaForm: FormGroup;
  @Input() pacientes: Paciente[] = [];
  @Input() asistentes: Asistente[] = [];
  @Input() tratamientos: Tratamiento[] = [];
  @Output() citaGuardada = new EventEmitter<any>();
  public textoBoton: string = 'Agendar';
  public textoSnackbar: string = 'Nueva Cita';

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authservice: AuthService,
    private supaBaseServie: SupabaseService,
    public bottomSheetRef: MatBottomSheetRef<SheetBottomAddCitaComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SheetBottom
  ) {
    this.citaForm = this.fb.group({
      fecha: [null, Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      paciente_id: [0, Validators.required],
      asistente_id: [0, Validators.required],
      tratamiento_id: [0, Validators.required],
    });
    this.pacientes = data.pacientes;
    this.asistentes = data.asistentes;
    this.tratamientos = data.tratamientos;
    if (data.accion == 2) {
      this.textoBoton = 'Reagendar';
      this.textoSnackbar = 'Reagendar Cita';
      this.citaForm.get('fecha')?.setValue(data.fecha);
      this.citaForm.get('hora_Inicio')?.setValue(data.hora_inicio);
      this.citaForm.get('hora_Fin')?.setValue(data.hora_fin);
      this.citaForm.get('paciente_Id')?.setValue(data.pacientes[0].id);
      this.citaForm.get('paciente_Id')?.disable();
      this.citaForm.get('tratamiento_Id')?.setValue(data.tratamientos[0].id);
      this.citaForm.get('tratamiento_Id')?.disable();
      this.citaForm.get('asistente_Id')?.setValue(data.asistentes[0].id);
      this.citaForm.get('asistente_Id')?.disable();
    }
    if (data.accion == 3) {
      this.citaForm.get('paciente_Id')?.setValue(data.pacientes[0].id);
      this.citaForm.get('paciente_Id')?.disable();
    }
  }
  ngOnInit(): void {
  
  }

  opcionBoton() {
    if (this.data.accion == 2) return this.actualizar('PUT');
    return this.guardar('POST');
  }
  async actualizar(arg0: string) {
    if (this.citaForm.valid) {
      
        this.textoBoton = 'Agendando...';
        const session = await this.supaBaseServie.getsession();
        if (!session.data?.session?.user.id)
          throw new Error('No hay sesión activa');
        const res = await this.supaBaseServie.supaBase.from('cita').update({
          user_id: session.data?.session?.user.id,
          ...this.citaForm.getRawValue(),
        }).eq('id', this.data.id);

     
        this.bottomSheetRef.dismiss(true);
        this.snackBar.open('✅ ' + 'Cita Guardada Correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      
    } else {
      this.citaForm.markAllAsTouched();
    }
  }

  async guardar(requestMethod: string) {
    if (this.citaForm.valid) {
      
        this.textoBoton = 'Agendando...';
        const session = await this.supaBaseServie.getsession();
        if (!session.data?.session?.user.id)
          throw new Error('No hay sesión activa');
        const res = await this.supaBaseServie.supaBase.from('cita').insert({
          user_id: session.data?.session?.user.id,
          ...this.citaForm.getRawValue(),
        });
        console.log(res);
        // this.citaGuardada.emit();
        this.bottomSheetRef.dismiss(true);
        this.snackBar.open('✅ ' + 'Cita Guardada Correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      
    } else {
      this.citaForm.markAllAsTouched();
    }
  }
}
