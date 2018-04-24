import _ from "lodash";

export const initialState = {
  listComments: {}
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case "GET_LIST_COMMENTS": {
      if (action.data) {
        return {
          ...state,
          listComments: action.data
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
