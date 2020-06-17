export const initialState = {
  detalle: {},
};

export default function ventaValor(state = initialState, action) {
  switch (action.type) {
    case 'MEDICION_DETALLE': {
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
