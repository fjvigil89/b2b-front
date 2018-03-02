export const initialState = {
  listSalas: [],
};

export default function salasReducer(state = initialState, action) {
  switch (action.type) {
    case 'SALAS_LIST': {
      if (action.data) {
        return {
          ...state,
          listSalas: action.data,
        };
      }

      return initialState;
    }
    default:
      return state;
  }
}
