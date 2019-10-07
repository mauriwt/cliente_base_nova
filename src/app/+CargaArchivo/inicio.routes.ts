import { Route } from '@angular/router';

export const InicioRoutes: Route[] = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('./listaDocumentos/listaDoc.module').then(m => m.ListaDocModule)
  },
];
