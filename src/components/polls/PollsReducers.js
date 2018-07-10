export const initialState = {
  position: 0,
  form: [],
  value: null,
  isError: false
};

export default function polls(state = initialState, action) {
  switch (action.type) {
    case "CURRENT_POSITION": {
      return {
        ...state,
        position: action.data
      };
    }
    case "NEXT_POSITION": {
      console.log("valid: ", state.value);
      if (state.value) {
        return {
          ...state,
          position: action.data.position,
          isError: false,
          value: null
        };
      }

      return {
        ...state,
        isError: true
      };
    }
    case "CHANGE_INPUT": {
      console.log("action.data.value: ", action.data.value);
      return {
        ...state,
        value: action.data.value,
        position: action.data.position
      };
    }
    default:
      return {
        ...state,
        position: 0,
        form: [],
        value: null,
        isError: false
      };
  }
}
