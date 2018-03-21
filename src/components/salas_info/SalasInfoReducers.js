export const initialState = {
  detailsSalas: [],
};

export default function salasInfo(state = initialState, action) {
  switch (action.type) {
    case "SALAS_LIST_INFO": {
      if (action.data) {
        return {
          ...state,
          detailsSalas: action.data,
        };
      }

      return initialState;
    }
    default:
      return state;
  }
}
