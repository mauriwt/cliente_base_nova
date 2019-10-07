import { AbstractControl, Validators } from '@angular/forms';
import { ComunService } from './comun.service';


export function ValidarCedula(control: AbstractControl) {
    if (ComunService.validarCedulaRucNatural(control.value, 'C')) {
        return null;
    }
    return { invalidDni: true };
}

export function ValidarRucPrivadoPublico(control: AbstractControl) {
    if (ComunService.validarRucPrivadoPublico(control.value, 'RX')) {
        return null;
    }
    return { invalidDni: true };
}

export function ValidarTiposRuc(control: AbstractControl) {
    if (ComunService.verificarTipoRuc(control.value)) {
        return null;
    }
    return { invalidDni: true };
}


export function validarTiposIdentificacion(controName, tipo) {
    switch (tipo) {
        case 'C':
            controName.setValidators([Validators.nullValidator, Validators.required, ValidarCedula]);
            break;
        case 'R':
            controName.setValidators([Validators.nullValidator, Validators.required, ValidarTiposRuc]);
            break;
        case 'X':
            controName.setValidators([Validators.nullValidator, Validators.required, ValidarRucPrivadoPublico]);
            break;
        default:
            controName.setValidators([Validators.nullValidator, Validators.required]);
            break;
    }
    controName.updateValueAndValidity();
}
