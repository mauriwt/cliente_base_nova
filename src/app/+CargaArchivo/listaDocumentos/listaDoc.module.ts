import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListaDocComponent } from './listaDoc.component';
import { ListaDocRoutes } from './listaDoc.routes';
import { FrmDocumentoModule } from '../frm-documento/frm-documento.module';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ListaDocComponent],
  exports: [ListaDocComponent],
  imports: [
    RouterModule.forChild(ListaDocRoutes),
    CommonModule, FrmDocumentoModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListaDocModule {}
