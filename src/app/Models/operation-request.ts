import { Cita } from "./citas";
import { auth } from "./login";
import { Tratamiento } from "./tratamiento";
import { Usuario } from "./usuario";

export interface operationRequest<T> {
    success:boolean;
    message:string;
    data:any;
}

export interface operationRequestCita{
    success:boolean;
    message:string;
    data:Cita[];
}
export interface operationRequestAuth{
    success:boolean;
    message:string;
    data:auth;
}

export interface operationRequestAsistente{
    success:boolean;
    message:string;
    data:Usuario[];
}

export interface operationRequestTratamiento{
    success:boolean;
    message:string;
    data:Tratamiento[];
}