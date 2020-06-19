export const initialState = {};

export default function ventaValor(state = initialState, action) {
  switch (action.type) {
    case 'MEDICION_DETALLE': {
      if (action.data) {
        return {
          ...state,
          ...action.data,
        };
      }

      return initialState;
    }
    default:
      return initialState;
  }
}
