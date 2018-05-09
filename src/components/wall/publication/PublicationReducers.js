export const initialState = {
  flag: true
};

export default function publication(state = initialState, action) {
  switch (action.type) {
    case "LIKE_PUBLICATION": {
      if (action.data) {
        return {
          ...state,
          flag: action.data
        };
      }

      return initialState;
    }
    case "RELOAD_STATE_PUBLICATION": {
      return state;
    }

    default:
      return state;
  }
}
