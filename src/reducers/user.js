import { SIGNUP_SUCCESS, LOGIN_SUCCESS, SIGNUP_ERROR, LOGIN_ERROR } from '../types/user';

const initialState = {
  currentUser: null,
  loginSuccess: false,
  loginError: "",
  signUpSuccess: false,
  signUpError: "",
}

const user = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.payload
      };
    default:
      return state;
  }
}

export default user;