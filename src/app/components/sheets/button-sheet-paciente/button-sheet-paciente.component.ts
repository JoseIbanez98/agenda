import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { AuthService } from '../../../services/auth.service';
import { operationRequest } from '../../../Models/operation-request';
import { Cita } from '../../../Models/citas';
import { environment } from '../../../Environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from '../../../Models/paciente';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-button-sheet-paciente',
  standalone: false,
  templateUrl: './button-sheet-paciente.component.html',
  styleUrl: './button-sheet-paciente.component.css',
})
export class ButtonSheetPacienteComponent implements OnInit {
  patientForm: FormGroup;

  titulo: string = 'Nuevo Paciente';
  botontext: string = 'Guardar Paciente';
  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<ButtonSheetPacienteComponent>,
    private _authservice: AuthService,
    private _supabaseService: SupabaseService,

    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Paciente
  ) {
    this.patientForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.pattern('^[0-9]*$')],
      direccion: [''],
      fecha: ['', Validators.required],
      notas_medicas: [''],
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.titulo = 'Editar Paciente';
      this.botontext = 'Actualizar Paciente';
      this.patientForm.patchValue({
        id: this.data.id,
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        email: this.data.email,
        telefono: this.data.telefono,
        direccion: this.data.direccion,
        fecha: this.data.fecha,
        notas_medicas: this.data.notas_medicas,
      });
    }
  }
  onSubmit(): void {
    if (this.patientForm.valid) this.guardarOrEditarPaciente();
  }

  closeSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  async guardarOrEditarPaciente() {
    const action = this.data == null ? 'Post' : 'Put';

    const session = await this._supabaseService.getsession();

    let responsePaciente: any;

    if (action === 'Put') {
      const { data, error } = await this._supabaseService.supabase
        .from('paciente')
        .update({
          id: this.data.id,
          user_id: session.data.session?.user.id,
          ...this.patientForm.getRawValue(),
        })
        .eq('user_id', session.data.session?.user.id)
        .eq('id', this.data.id);
      if (error) {
        this._snackBar.open('❌ ' + error.message, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        return;
      }
    }
    if (action === 'Post') {
      responsePaciente = await this._supabaseService.supaBase
        .from('paciente')
        .insert({
          user_id: session.data.session?.user.id,
          ...this.patientForm.getRawValue(),
        });

      if (responsePaciente.error) {
        this._snackBar.open('❌ ' + responsePaciente.error.message, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        return;
      }
    }
    this._bottomSheetRef.dismiss(true);
    this._snackBar.open('✅' + 'Paciente Guardado Correctamente', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
