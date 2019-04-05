export const initialState = {
  info: {
    fecha_periodo: {
      actual: "",
      anterior: ""
    },
    banderas: [{
      nombre: "",
      fecha_actualizacion: "",
      ventas: {
        causas: {
          mismas_salas: "",
          productos_descatalogados: "",
          productos_nuevos: "",
          salas_cerradas: "",
          salas_nuevas: "",
          total: ""
        },
        variacion: ""
      },
      ventas_perdidas: {
        causas: {
          chequear_pedidos: "",
          desajuste_stock: "",
          productos_descatalogados: "",
          reposicion: "",
          total: ""
        },
        variacion: ""
      }
    }],
    total_ventas: "",
    venta_perdida: "",
    venta_unidades: ""
  }
};

export default function reporte(state = initialState, action) {
  switch (action.type) {
    case "REPORT_DETAIL": {
      if (action.data) {
        return {
          ...state,
          info: action.data
        };
      }

      return initialState;
    }
    default:
      return state;
  }
}
