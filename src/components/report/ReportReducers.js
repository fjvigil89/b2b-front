export const initialState = {
  info: null
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
