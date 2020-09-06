import { SET_CURRENT_USER, SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types/user';


const currentUser = localStorage.getItem('jwt');
const initialState = currentUser ? {
  isAuthenticated: true,
  currentUser: currentUser,
  loginSuccess: false,
  signUpSuccess: false,
} : {
  isAuthenticated: false,
  currentUser: {},
  loginSuccess: false,
  signUpSuccess: false,
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
        loginSuccess: true
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
        currentUser: {}
      }
    default:
      return state;
  }
}

export default user;