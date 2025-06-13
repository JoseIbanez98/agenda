import { Asistente } from "./asistente";
import { Paciente } from "./paciente";
import { Tratamiento } from "./tratamiento";
import { TratamientoPaciente } from "./TratamientoPaciente";


export interface Cita{
    id: number,
    fecha:string,
    hora_inicio: string,
    hora_fin: string,
    paciente: Paciente,
    tratamiento:Tratamiento,
    profiles:Asistente
}
