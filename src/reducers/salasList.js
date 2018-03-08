export const initialState = {
  refreshing: false,
};

export default function salasListReducer(state = initialState, action) {
  switch (action.type) {
    case 'SALAS_LIST_REFRESH': {
      return {
        ...state,
        refreshing: !state.refreshing,
      };
    }
    default:
      return state;
  }
}
