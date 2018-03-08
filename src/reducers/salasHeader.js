export const initialState = {
  showSearch: false,
  inputSearch: '',
};

export default function salasHeaderReducer(state = initialState, action) {
  switch (action.type) {
    case 'SALAS_HEADER_SHOW_SEARCH': {
      return {
        ...state,
        showSearch: !state.showSearch,
        inputSearch: '',
      };
    }
    case 'SALAS_HEADER_CLEAR_SEARCH': {
      return {
        ...state,
        showSearch: !state.showSearch,
      };
    }
    case 'SALAS_HEADER_SEARCH_BY_NAME': {
      if (action.text) {
        return {
          ...state,
          inputSearch: action.text,
        };
      }

      return state;
    }
    default:
      return state;
  }
}
