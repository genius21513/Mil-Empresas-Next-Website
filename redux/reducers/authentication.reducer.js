import { HYDRATE } from "next-redux-wrapper";
import { userConstants } from "../constants";

const authentication = (state = { loggedIn: false, auth: null }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.auth };

    case userConstants.LOGIN_REQUEST:
      return { operation: "request" };
    case userConstants.LOGIN_SUCCESS:
      return { loggedIn: true, auth: action.auth, operation: "success" };

    case userConstants.LOGOUT_REQUEST:
      return { ...state, operation: "request" };
    case userConstants.LOGOUT_SUCCESS:
      return { loggedIn: false, operation: "success" };

    case userConstants.AUTH_UPDATE_SUCCESS:
      return { ...state, ...action.auth };
    case userConstants.REAUTHENTICATION:
      return { loggedIn: true, auth: action.auth }
    default:
      return state;
  }
};

export default authentication;
