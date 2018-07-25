export const initialState = {
  data: null
};

export default function hashtags(state = initialState, action) {
  switch (action.type) {
    case "GET_PUBLICATIONS_HASHTAGS": {
      if (action.data) {
        return {
          ...state,
          data: action.data.posts
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
