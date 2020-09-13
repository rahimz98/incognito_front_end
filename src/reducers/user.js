import { SET_CURRENT_USER, SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types';

// logoutSuccess is only used to check whether an authorizated user tries to access private pages which then redirects them to login with a prompt
// The prompt's condition to appear relies on the logoutSuccess boolean
const currentUser = localStorage.getItem('jwt');
const initialState = currentUser ? {
  isAuthenticated: true,
  currentUser: currentUser,
  loginSuccess: true,
  signUpSuccess: false,
  logoutSuccess: false
} : {
  isAuthenticated: false,
  currentUser: {},
  loginSuccess: false,
  signUpSuccess: false,
  logoutSuccess: false
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        logoutSuccess: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        loginSuccess: false,
        logoutSuccess: true,
      }
    default:
      return state;
  }
}

export default user;