import { Routes } from '@angular/router';
import { InicioRoutes } from './+CargaArchivo/inicio.routes';
import { NoPageRoutes } from './no-page/no-page.routes';

export const routes: Routes = [...InicioRoutes, ...NoPageRoutes];
