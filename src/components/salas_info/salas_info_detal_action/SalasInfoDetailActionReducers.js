export const initialState = {
  productos: []
};

export default function productos(state = initialState, action) {
  switch (action.type) {
    case "PRODUCTOS_LIST": {
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
