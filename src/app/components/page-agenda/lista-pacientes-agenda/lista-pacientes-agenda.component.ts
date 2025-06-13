import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  operationRequest,
  operationRequestCita,
} from '../../../Models/operation-request';
import { environment } from '../../../Environments/environment';
import { Cita } from '../../../Models/citas';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SheetBottomAddCitaComponent } from '../../sheets/sheet-bottom-add-cita/sheet-bottom-add-cita.component';
import { SheetbottomService } from '../../../services/sheetbottom.service';
import { ButtonSheetPacienteComponent } from '../../sheets/button-sheet-paciente/button-sheet-paciente.component';
@Component({
  selector: 'app-lista-pacientes-agenda',
  standalone: false,
  templateUrl: './lista-pacientes-agenda.component.html',
  styleUrl: './lista-pacientes-agenda.component.css',
})
export class ListaPacientesAgendaComponent implements OnInit {
  @Input() listaCitas: Cita[] = [];

  @Input() porcentaje: number = 0;
  @Input() numCitas: number = 0;
  @Input() listEmpty: boolean = true;
  @Input() loadingHeaders: boolean = true;
  @Output() citaGuardada = new EventEmitter<any>();
  horaActual: string = '';

  constructor(
    private bottomSheet: MatBottomSheet,
    private serviceSheet: SheetbottomService
  ) {}
  ngOnInit(): void {
    this.numCitas = this.listaCitas?.length ?? 0;
  }
  async abrirSheet() {
    const data = await this.serviceSheet.dataSheet();
    const ref = await this.serviceSheet.openSheet(
      SheetBottomAddCitaComponent,
      data
    );
    ref.afterDismissed().subscribe((res) => {
      if (res) {
        this.citaGuardada.emit();
      }
    });
  }
  citaEditada() {
    this.citaGuardada.emit();
  }
}
