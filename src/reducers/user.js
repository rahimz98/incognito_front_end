import { SET_AUTHENTICATED, SET_USER_ID, SET_USER, SET_USER_IMAGE, LOGOUT_SUCCESS } from '../types';

const initialState = {
  isAuth: false,
  id: '',
  profile: {},
  image: '',
  logoutSuccess: false
};

const user = (state=initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuth: true
      };
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload
      }
    case SET_USER:
      return {
        ...state,
        profile: action.payload
      };
    case SET_USER_IMAGE:
      return {
        ...state,
        image: action.payload
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default user;