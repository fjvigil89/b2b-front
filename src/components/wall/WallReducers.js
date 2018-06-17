import { get, last } from "lodash";

export const initialState = {
  data: null,
  lastId: 0
};

export default function wall(state = initialState, action) {
  switch (action.type) {
    case "GET_LIST_POST": {
      if (action.data) {
        const lastId = get(last(action.data.posts), "id");

        return {
          ...state,
          data: action.data.posts,
          lastId
        };
      }

      return initialState;
    }

    case "GET_LIST_POST_MORE": {
      if (action.data) {
        const lastId = get(last(action.data.posts), "id");

        const fullPostsList = state.data.concat(action.data.posts);

        return {
          ...state,
          data: fullPostsList,
          lastId
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
