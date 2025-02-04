import { FormGroup, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
  private formulario: FormGroup;

  // get all values of the formGroup, loop over them
  // then mark each field as touched
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  // return list of error messages
  public validationMessages() {
    const messages = {
      required: 'El campo es requerido',
      email: 'El correo electrónico ingresado no es válido',
      invalidDni: 'La número ingresado no cumple los criterios de validación de RUC o Cédula Ecuatoriana.',
      pattern: '',
      maxlength: '',
      minlength: '',
    };

    return messages;
  }

  public validateForm(formToValidate: FormGroup, formErrors: any, lista: any[], checkDirty?: boolean, ) {
    const form = formToValidate;
    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        const messages = this.validationMessages(); 
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched || control.errors)) {
            for (const key in control.errors) {
              switch (key) {
                case 'pattern':
                  formErrors[field] = lista.find(item => item.id === field).pattern;
                  break;
                case 'maxlength':
                  formErrors[field] = lista.find(item => item.id === field).maxLength;
                  break;
                case 'minlength':
                  formErrors[field] = lista.find(item => item.id === field).minLength;
                  break;
                default:
                  formErrors[field] = messages[key];
                  break;
              }
            }
          }
        }
      }
    }

    return formErrors;
  }

  public generar(campos) {
    this.formulario = new FormGroup({});
    for (let o of campos) {
      if (o.tipo === 'checkbox')
        this.formulario.addControl(o.id, new FormControl(false, o.validar));
      this.formulario.addControl(o.id, new FormControl('', o.validar));
    }
    return this.formulario;
  }
}