import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paciente } from '../../../Models/paciente';
import { auth } from '../../../Models/login';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../Environments/environment';
import { operationRequest } from '../../../Models/operation-request';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-lista-pacientes',
  standalone: false,
  templateUrl: './lista-pacientes.component.html',
  styleUrl: './lista-pacientes.component.css',
})
export class ListaPacientesComponent implements OnInit {
  filtro: string = '';

  @Input() numPacientes: number = 0;
  @Input() listaPacientes: Paciente[] = [];
  @Output() pacienteGuardado = new EventEmitter<any>();
  constructor(private http: AuthService) {}
  ngOnInit(): void {
 
  }

  generarListaPacientes() {
    this.pacienteGuardado.emit();

  }
}
