export const initialState = {
  loading: false,
  error: null,
  email: "boadude@gmail.com",
  password: "slipknot"
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          isAuthenticated: true,
          token: action.data.token
        };
      }

      return initialState;
    }
    case "USER_LOGOUT": {
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: false,
        token: null
      };
    }
    case "USER_CHANGE_INPUT": {
      if (action.data) {
        return {
          ...state,
          [action.data.name]: action.data.value
        };
      }

      return state;
    }

    default:
      return state;
  }
}
