export const initialState = {
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          isAuthenticated: true,
          token: action.data.token,
        };
      }

      return initialState;
    }
    case 'USER_LOGOUT': {
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: false,
        token: null,
      };
    }
    default:
      return state;
  }
}
