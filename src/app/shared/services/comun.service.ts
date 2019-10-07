import { Injectable } from '@angular/core';
import { config } from '../servicios.config';
import { CRUDService } from './crud.service';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';

declare var $;

@Injectable({
  providedIn: 'root'
})
export class ComunService {
  public Urlbase = config.confProducto.dominio;
  public Urlbase2 = config.portalCliente.dominio;
  private static tipos: any[] = [{ id: 'C', valor: 10, digito3: 5 }, { id: 'R', valor: 13, digito3: 5 },
  { id: 'RP', valor: 13, digito3: 6 }, { id: 'RX', valor: 13, digito3: 9 }];
  constructor(private dialog: MatDialog, private crud: CRUDService, ) { }


  checkIdentificacion(id: string) {
    const pattern = /^[0-9]{14}$/i;
    return pattern.test(id);
  }

  public obtenerProductosCliente(identificacion: string) {
    return new Observable(observer => {
      this.crud.obtener(`${this.Urlbase}${config.confProducto.producto.cliente}${identificacion}`)
        .subscribe((data: any) => {
          observer.next(data);
        });
    });
  }

  public obtenerDetallesProductoCliente(identificacion: string, codigoProducto: string) {
    return new Observable(observer => {
      this.crud.obtener(`${this.Urlbase2}${config.portalCliente.producto.detalle}${identificacion}${config.portalCliente.producto.codigo}${codigoProducto}`)
        .subscribe((data: any) => {
          observer.next(data);
        });
    });
  }

  public confirmDialog(titulo, mensaje) {
    return new Observable(observer => {
      const dialogData = new ConfirmDialogModel(titulo, mensaje);

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "100%",
        data: dialogData
      });
      //dialogRef.updateSize('60%', '');
      dialogRef.afterClosed().subscribe(dialogResult => {
        observer.next(dialogResult);
      });
    });
  }

  getCliente(identificacion) {
    return new Observable(observer => {
      this.crud.obtener(`${this.Urlbase}${config.confProducto.cliente.base}${identificacion}`).subscribe(cliente => {
        observer.next(cliente);
        observer.complete();
      });
    });
  }

  validarEntrada(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 58) ||
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122) ||
      (event.keyCode == 241 || event.keyCode == 209 || event.keyCode == 32)) {
      return true;
    }
    return false;
  }

  depurarIdentificacion(identificacionOriginal: string) {
    var identificacionDepurada = identificacionOriginal;
    if (!this.isBlank(identificacionOriginal)) {
      if (identificacionDepurada.length > 13) {
        var inicio = identificacionDepurada.length - 13;
        identificacionDepurada = identificacionDepurada.substring(inicio);
        var caracteresIniciales = identificacionDepurada.substring(0, 3);
        if (caracteresIniciales == "000") {
          identificacionDepurada = identificacionDepurada.substring(3);
        }
      }
    }
    return identificacionDepurada;
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  fechaIsoADate(fechaIso: Date) {
    if (fechaIso)
      return moment(fechaIso).format("YYYY-MM-DD");
    return '';
  }

  openClose(modalID, accion) {
    $('#' + modalID).modal(accion);
  }

  public static verificarTipoRuc(ruc) {
    if(!ruc) return;
    let tercerDigito: number = ruc.substr(2, 1);
    if (tercerDigito < 6)
      return this.validarCedulaRucNatural(ruc, 'R')
    if (tercerDigito == 6)
      return this.validarRucPrivadoPublico(ruc, 'RP')
    if (tercerDigito == 9)
      return this.validarRucPrivadoPublico(ruc, 'RX');
  }

  public static validarCedulaRucNatural(ruc, tipo) {
    let tmpTipo = this.tipos.find(item => item.id === tipo);
    ruc = String(ruc);
    if (ruc.length == tmpTipo.valor) {
      if (ruc.substring(0, 2) < 0 || ruc.substring(0, 2) > 24)
        return false;
      if (ruc.substr(2, 1) > tmpTipo.digito3) {
        return false;
      }
      if (tipo === 'C') {
        return this.validarNatural(ruc);
      } else {
        if (ruc.substr(10, 3) < 1) {
          return false;
        }
        return this.validarNatural(ruc);
      }
    }
  }

  private static validarNatural(ruc) {
    let coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let digitos = ruc.substring(0, 9);
    let digitosIniciales = digitos.split('', 9);
    let digitoVerificador = +ruc[9];
    let total = 0;
    digitosIniciales.forEach((digito, i) => {
      let valorPosicion = +digito * coeficientes[i];
      valorPosicion = valorPosicion > 9 ? valorPosicion - 9 : valorPosicion;
      total = total + valorPosicion;
    });
    let residuo = total % 10;
    let resultado;
    if (residuo == 0)
      resultado = 0;
    else
      resultado = 10 - residuo;

    if (resultado != digitoVerificador) {
      return false;
    }
    return true;
  }

  public static validarRucPrivadoPublico(ruc, tipo) {
    let tmpTipo = this.tipos.find(item => item.id === tipo);
    ruc = String(ruc);
    if (ruc.length == tmpTipo.valor) {
      if (ruc.substring(0, 2) < 0 || ruc.substring(0, 2) > 24)
        return false;
      if (ruc.substr(2, 1) > tmpTipo.digito3) {
        return false;
      }
      if (tipo === 'RP') {
        if (ruc.substr(9, 4) < 1) {
          return false;
        }
        let coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
        return this.validarJuridico(ruc, coeficientes, 8);
      } else {
        if (ruc.substr(10, 3) < 1) {
          return false;
        }
        let coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
        return this.validarJuridico(ruc, coeficientes, 9);
      }
    }
  }

  private static validarJuridico(ruc, coeficientes, numValid: number) {
    let digitos = ruc.substring(0, numValid);
    let digitosIniciales = digitos.split('', numValid);
    let digitoVerificador = +ruc[numValid];
    let total = 0;
    digitosIniciales.forEach((digito, i) => {
      let valorPosicion = +digito * coeficientes[i];
      total = total + valorPosicion;
    });
    let residuo = total % 11;
    let resultado;
    if (residuo == 0)
      resultado = 0;
    else
      resultado = 11 - residuo;

    if (resultado != digitoVerificador) {
      return false;
    }
    return true;
  }

  capitalize(object) {
    for (let key in object) {
      let value = object[key];
      let newValue = value;
      if (typeof value != "object") {
        if (typeof value == "string") {
          newValue = value.toUpperCase();
        }
      } else {
        newValue = this.capitalize(value);
      }
      object[key] = newValue;
    }
    return object;
  }
}
