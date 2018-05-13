export const initialState = {
  listPost: [],
  refresh: false
};

export default function wall(state = initialState, action) {
  switch (action.type) {
    case "GET_LIST_POST": {
      if (action.data) {
        return {
          ...state,
          listPost: action.data.posts,
          refresh: !state.refresh
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
