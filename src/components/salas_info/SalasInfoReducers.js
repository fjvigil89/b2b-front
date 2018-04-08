export const initialState = {
  loading: true,
  detailsSalas: {}
};

export default function salasInfo(state = initialState, action) {
  switch (action.type) {
    case "SALAS_LIST_INFO": {
      if (action.data) {
        return {
          ...state,
          loading: false,
          detailsSalas: action.data
        };
      }

      return initialState;
    }
    case "SALAS_LIST_INFO_LOADING": {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return state;
  }
}
