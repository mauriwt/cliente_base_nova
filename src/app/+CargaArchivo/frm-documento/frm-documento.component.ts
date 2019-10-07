import { Component, OnInit, ViewChild, ViewEncapsulation, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {CRUDService, FileUploadService, AlertifyService, FormService } from '../../shared/services';
import { config } from '../../shared/servicios.config';
import { Observable } from 'rxjs';
import { Documento } from '../../models';

declare var $;

@Component({
  selector: 'app-frm-documento',
  templateUrl: './frm-documento.component.html',
  styleUrls: ['./frm-documento.component.scss']
})
export class FrmDocumentoComponent implements OnInit {


  @Output() cerrar = new EventEmitter()
  public formulario: FormGroup;
  public cargando: boolean;
  private urlbase = config.sigsIntg.dominio;
  public lista: any;
  public files: any;
  public respaldo: boolean;

  constructor(private crudServer: CRUDService, private fileService: FileUploadService, private msj: AlertifyService, private frmservi: FormService) { }

  ngOnInit() {
    this.formulario = this.frmservi.generar(Documento.campos());
  }

  guardar(){
    this.fileService.generarFileRequest(`api/SampleData/upload`,
        { codigoDocumento: 2, ruta: "" }, this.files)
        .subscribe(response => {
          $('#file').val("");
        }, error => {
          this.msj.error("Se detectó un problema al subir el ducumento.")
          this.cargando = false;
        });
  }
  
  cargarArchivo(codigo, files, url) {
    return new Observable(observer => {
      this.fileService.generarFileRequest(`${this.urlbase}${config.sigsIntg.cancelacion.upsertClienteEmpresa}`,
        { codigoDocumento: codigo, ruta: url }, files)
        .subscribe(response => {
          $('#file').val("");
          observer.next(response);
          observer.complete();
        }, error => {
          this.msj.error("Se detectó un problema al subir el ducumento.")
          this.cargando = false;
        });
    });
  }

  public setArchivo(event) {
    this.files = (event.srcElement) ? event.srcElement.files : event.target.files;
  }

  cancelar() {
    this.formulario.reset();
  }
}
