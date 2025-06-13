import { Asistente } from "./asistente";
import { Paciente } from "./paciente";
import { Tratamiento } from "./tratamiento";
import { Usuario } from "./usuario";

export interface SheetBottom {
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    pacientes: Paciente[];
    asistentes: Asistente[];
    tratamientos: Tratamiento[];
    accion:Number;
    id?: number;
}