import { Validators } from "@angular/forms";

export class Documento{
    public personas:any;
    public tipoPermiso:number;
    public fechaInicio:Date;
    public fechaFin:Date;
    public horaInicio:Date;
    public horaFin:Date;
    public porDias:boolean;
    public tipoAusencia:number;
    public codigosAusencia:any;
    public codigosAsistencia:any;
    public cabecerasPermiso:any;
    public usuario:string;

    public static campos() {
        return [
            { id: 'tipoDocumento', validar: [Validators.nullValidator, Validators.required] },
            { id: 'file', validar: [Validators.nullValidator, Validators.required] },
            { id: 'descripcion', validar: [] },
        ]
    }
}
