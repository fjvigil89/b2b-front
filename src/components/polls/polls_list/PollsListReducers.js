export const initialState = {
  listPolls: [],
  isLoading: true
};

export default function polls(state = initialState, action) {
  switch (action.type) {
    case "GET_LIST_POLLS": {
      if (action.data) {
        return {
          ...state,
          listPolls: action.data,
          isLoading: false
        };
      }

      return initialState;
    }
    case "REFRESH_LIST_POLL": {
      return {
        ...state
      };
    }
    default:
      return {
        ...state
      };
  }
}
