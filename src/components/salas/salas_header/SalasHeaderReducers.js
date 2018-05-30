export const initialState = {
  showSearch: false,
  inputSearch: "",
  orderLostSale: true,
};

export default function salasHeader(state = initialState, action) {
  switch (action.type) {
    case "SALAS_HEADER_SHOW_SEARCH": {
      return {
        ...state,
        showSearch: !state.showSearch,
        inputSearch: ""
      };
    }
    case "SALAS_HEADER_CLEAR_SEARCH": {
      return {
        ...state,
        showSearch: !state.showSearch
      };
    }
    case "SALAS_HEADER_SEARCH_BY_NAME": {
      return {
        ...state,
        inputSearch: action.text
      };
    }
    case "SHOW_GEO_LOCATION": {
      return {
        ...state,
        orderLostSale: !state.orderLostSale
      };
    }
    default:
      return state;
  }
}
