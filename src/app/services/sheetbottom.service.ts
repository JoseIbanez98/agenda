import { Component, Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { SheetBottomAddCitaComponent } from '../components/sheets/sheet-bottom-add-cita/sheet-bottom-add-cita.component';
import { auth } from '../Models/login';
import { AuthService } from './auth.service';
import { operationRequest } from '../Models/operation-request';
import { Paciente } from '../Models/paciente';
import { environment } from '../Environments/environment';
import { Asistente } from '../Models/asistente';
import { Tratamiento } from '../Models/tratamiento';
import { Usuario } from '../Models/usuario';
import { SheetBottom } from '../Models/sheetBottom';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ComponentType } from '@angular/cdk/portal';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SheetbottomService {
  pacientes: Paciente[] = [];
  asistentes: Usuario[] = [];
  tratamientos: Tratamiento[] = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private authservice: AuthService,
    private supabaseService: SupabaseService
  ) {}
  async openSheet(
    sheetBottom: ComponentType<any>,
    data?: any
  ): Promise<MatBottomSheetRef<any>> {
    return this.bottomSheet.open(sheetBottom, { data });
  }

  async dataSheet(Paciente?: Paciente): Promise<SheetBottom> {
    try {
      const pacientes: Paciente[] = [];

      if (Paciente) {
        pacientes.push(Paciente);
      } else {
        const { data, error } = await this.supabaseService.supabase
          .from('paciente')
          .select('*');

        if (error) {
          throw new Error('Error al obtener pacientes: ' + error.message);
        }

        pacientes.push(...(data || []));
      }

      const asistentesRes = await this.supabaseService.supabase
        .from('profiles')
        .select('*')
        .eq('rol', 2);

      if (asistentesRes.error) {
        throw new Error(
          'Error al obtener asistentes: ' + asistentesRes.error.message
        );
      }

      const tratamientosRes = await this.supabaseService.supabase
        .from('tratamiento')
        .select('*');

      if (tratamientosRes.error) {
        throw new Error(
          'Error al obtener tratamientos: ' + tratamientosRes.error.message
        );
      }

      const data: SheetBottom = {
        pacientes,
        asistentes: asistentesRes.data || [],
        id: Paciente?.id,
        tratamientos: tratamientosRes.data || [],
        accion: 1,
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
      };

      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Ocurrió un error al preparar los datos para la hoja.');
    }
  }
}
