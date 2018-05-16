export const initialState = {
  detailPublication: {}
};

export default function publications(state = initialState, action) {
  switch (action.type) {
    case "DETAIL_PUBLICATION": {
      if (action.data) {
        return {
          ...state,
          detailPublication: action.data.post
        };
      }

      return initialState;
    }

    default:
      return state;
  }
}
