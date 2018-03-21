export const initialState = {
  detailsSalas: [],
};

export default function salas(state = initialState, action) {
  switch (action.type) {
    case "SALAS_LIST_INFO": {
      if (action.data) {
        console.log(action.data);
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
