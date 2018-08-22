export const initialState = {
  productos: []
};

export default function productosCademsmart(state = initialState, action) {
  switch (action.type) {
    case "PRODUCTOS_CADEMSMART_LIST": {
      if (action.data) {
        return {
          ...state,
          productos: action.data
        };
      }

      return initialState;
    }
    default:
      return initialState;
  }
}
