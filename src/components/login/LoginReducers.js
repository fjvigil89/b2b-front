import axios from "axios";

export const initialState = {
  loading: false,
  error: null,
  email: "",
  password: "",
  token: ""
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      if (action.data) {
        axios.defaults.headers.common.Authorization = `Bearer ${
          action.data.token
        }`;

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
    case "SET_TOKEN": {
      const validToken = !!state.token;

      if (validToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
        return {
          ...state,
          isAuthenticated: true
        };
      }

      delete axios.defaults.headers.common.Authorization;
      return {
        ...state,
        isAuthenticated: false
      };
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
