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
    default:
      return {
        ...state
      };
  }
}
