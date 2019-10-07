import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var $;

@Injectable()
export class AlertifyService {

  constructor(private _snackBar: MatSnackBar) {
    alertify.set('notifier','position', 'top-right');
   }

  success(msj: string) {
    alertify.notify(`<i class='fa fa-check'></i>${msj}`, 'ok');
  }

  warning(msj: string) {
    alertify.notify(`<i class='fa fa-exclamation-triangle'></i> ${msj}`, 'alerta');
  }

  message(msj: string) {
    alertify.notify(`<i class='fa fa-check'></i> ${msj}`, 'info');
  }

  error(msj: string) {
    alertify.notify(`<i class='fa fa-ban'></i> ${msj}`, 'falla');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2 * 1000,
      panelClass: ['warning'],
      //verticalPosition: 'top'
    });
  }

  openClose(modalID,accion) {
    $('#' + modalID).modal(accion);
  }
  
}
