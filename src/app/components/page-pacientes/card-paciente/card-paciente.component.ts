import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../../../Models/paciente';
import { SheetbottomService } from '../../../services/sheetbottom.service';
import { SheetBottomAddCitaComponent } from '../../sheets/sheet-bottom-add-cita/sheet-bottom-add-cita.component';
import { ButtonSheetPacienteComponent } from '../../sheets/button-sheet-paciente/button-sheet-paciente.component';

@Component({
  selector: 'app-card-paciente',
  standalone: false,
  templateUrl: './card-paciente.component.html',
  styleUrl: './card-paciente.component.css',
})
export class CardPacienteComponent {


  @Output() pacienteGuardado = new EventEmitter<any>();
  @Input() paciente: Paciente = {
    apellido: '',
    direccion: '',
    email: '',
    fecha: '',
    nombre: '',
    notas_medicas: '',
    telefono: '',
  };
  constructor(private serviceSheet: SheetbottomService) {}
  async abrirSheetNuevaCita() {
    const data = await this.serviceSheet.dataSheet(this.paciente);
    data.accion = 3;
    await this.serviceSheet.openSheet(SheetBottomAddCitaComponent, data);
  }

  async abrirSheetEditarPaciente(paciente: Paciente) {
    const ref = await this.serviceSheet.openSheet(
      ButtonSheetPacienteComponent,
      paciente
    );
    ref.afterDismissed().subscribe((result) => {
      if (result) {
        
        this.pacienteGuardado.emit();
      }
    });
  }
}
