import {
  //SIGNUP_SUCCESS,
  //SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const appAuth = (state, action) => {
  const { type, payload } = action;
  if (state === undefined) {
    return {
      token: localStorage.getItem("token"),
      authenticated: localStorage.getItem("token") ? true : null,
      loading: false,
    };
  }

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        authenticated: true,
        loading: false,
        token: payload.token,
      };
    /*     case SIGNUP_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        authenticated: true,
        loading: true,
        token: payload.token,
      };
    case SIGNUP_FAIL: */
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("users");
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default appAuth;
