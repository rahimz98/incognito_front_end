import {
  SET_BASIC_EDIT,
  SET_BIO_EDIT,
  SET_EXPERIENCE_EDIT,
  SET_EDUCATION_EDIT,
  SET_ACHIEVEMENTS_EDIT,
  SET_CLOSE_EDITS,
  SET_EDIT_ERROR,
} from '../types';

export const initialState = {
  basic: false,
  name: false,
  contacts: false,
  bio: false,
  experience: false,
  education: false,
  achievements: false,
  expError: false,
  eduError: false,
  achvError: false,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SET_BASIC_EDIT:
      return {
        ...state,
        basic: action.open,
      };
    case SET_BIO_EDIT:
      return {
        ...state,
        bio: action.open,
      };
    case SET_EXPERIENCE_EDIT:
      return {
        ...state,
        experience: action.open,
      };
    case SET_EDUCATION_EDIT:
      return {
        ...state,
        education: action.open,
      };
    case SET_ACHIEVEMENTS_EDIT:
      return {
        ...state,
        achievements: action.open,
      };
    case SET_CLOSE_EDITS:
      return initialState;
    case SET_EDIT_ERROR:
      return {
        ...state,
        expError: action.expError,
        eduError: action.eduError,
        achvError: action.achvError,
      };
    default:
      return state;
  }
};

export default profile;
