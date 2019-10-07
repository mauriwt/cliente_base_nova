import { environment } from '../../environments/environment'
export const config: any = {
  zohoSuccess: 'SUCCESS',
  zoho: "<b class='text-danger'>Z</b><b class='text-success'>O</b><b class='text-primary'>H</b><b class='text-warning'>O</b>",
  sigsIntg:
  {
    dominio: environment.sigs_integracion,
    cancelacion: {
      producto: 'Cancelaciones/ActualizarCancelacionResumido?TokenUsuario=111221',
      buscarXDniNombre: 'Cancelaciones/ObtenerClientesPorIdentificacionNombre?Parametro=',
      buscarXDni: 'Cancelaciones/ObtenerDetalleClientePorIdentificacion?Identificacion=',
      direcciones: 'Cancelaciones/ConsultaDireccionClienteXIdCliente?IdCliente=',
      localizacion: 'Cancelaciones/ConsultaLocalizacionClienteXIdClienteTipo?IdCliente=',
      upsertClienteEmpresa: 'Cancelaciones/InsertarActualizarCliente?TokenUsuario=12121'
    },
    catalogo: {
      tpIdentificaciones: 'Catalogo/ObtenerTipoIdentificacion?',
      generos: 'Catalogo/ObtenerGeneroPersona?',
      estadoCivil: 'Catalogo/ObtenerEstadosCiviles?',
      fventas: 'Catalogo/ObtenerFuerzaVentaPorSegmento?CodigoSegmento=',
      segmentos: 'Catalogo/ObtenerSegmentoPersona?',
      provincias: 'Catalogo/ObtenerProvincias?',
      cantones: 'Catalogo/ObtenerCantones?codigoProvincia=',
      paises: 'Catalogo/ObtenerPaises?',
      telefono: 'Cancelaciones/ObtenerTipoLocalizacionXTipo?',
      correo: 'Cancelaciones/ObtenerTipoLocalizacionXTipo?',
      direccion: 'Catalogo/ObtenerTipoDireccion?',
    },
    token: '&TokenUsuario=111221'
  },
  tokenCalagolo: 'TokenUsuario=43c44eea-f675-4020-95fe-5cb2ad2a05c4',
  tpTelefono: 'Tipo=Telefono',
  tpEmail: 'Tipo=Correo',
  confProducto:
  {
    dominio: environment.productos_core,
    producto: {
      base: 'ConfiguracionProducto/ObtenerListadoConfiguracionProducto?nombreProducto=',
      update: 'ConfiguracionProducto/ActualizarConfiguracionProducto',
      aseguradoras: 'ConfiguracionProducto/ObtenerDatosAseguradorasParaCatalogo',
      ramos: 'ConfiguracionProducto/ObtenerDatosRamosParaCatalogo',
      aseguradoRamo: 'ConfiguracionProducto/ObtenerDatosProductosParaCatalogo?codigoProveedor=',
      codigoRamo: '&codigoRamo=',
      cliente: 'ConfiguracionProducto/ObtenerListadoVentasCliente/?Identificacion='
    },
    catalogo: {
      base: 'Catalogo/ObtenerAdministradorDelProducto'
    },
    cliente: {
      base: 'Cliente/ObtenerDatosClientePorIdentificacion?Identificacion='
    }
  },
  portalCliente:
  {
    dominio: 'http://localhost:54663/api/',
    producto: {
      cliente: 'PortalCliente/ObtenerProductosCliente?Identificacion=',
      detalle: 'PortalCliente/ObtenerDetallesProductoCliente?identificacion=',
      codigo: '&codigoProducto='
    },
  },
};
