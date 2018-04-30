export const initialState = {
  listPost: []
};

export default function wall(state = initialState, action) {
  switch (action.type) {
    case "GET_LIST_POST": {
      if (action.data) {
        return {
          ...state,
          listPost: action.data.posts
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
