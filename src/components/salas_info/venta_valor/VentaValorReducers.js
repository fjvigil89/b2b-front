export const initialState = {
  detalle: {},
};

export default function ventaValor(state = initialState, action) {
  switch (action.type) {
    case 'VENTA_VALOR': {
      if (action.data) {
        return {
          ...state,
          detalle: action.data,
        };
      }

      return initialState;
    }
    default:
      return initialState;
  }
}
