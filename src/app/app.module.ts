import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


import {
  CRUDService, AlertifyService,
  FormService, FileUploadService
} from './shared/services';


import { AppRoutingModule } from './app-routing.module';
import { routes } from './app.routing';


import { DxTemplateModule } from 'devextreme-angular';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es-EC';
import localeFrExtra from '@angular/common/locales/extra/es-EC';

import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

import {
  MatDialogModule, MatSnackBarModule,
} from '@angular/material';

import {InicioModule} from './+CargaArchivo/inicio.module';
import {NoPageModule} from './no-page/no-page.module';
import { SharedModule } from './shared/shared.module';


registerLocaleData(localeFr, 'es-EC', localeFrExtra);
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes, { useHash: true }),
    DxTemplateModule,
    BrowserAnimationsModule,
    MatDialogModule, MatSnackBarModule,
    SharedModule,

    InicioModule,
    NoPageModule

  ],
  exports: [RouterModule, MatDialogModule, SharedModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es-EC' },
    CRUDService,
    AlertifyService, FormService, FileUploadService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
