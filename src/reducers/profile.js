import {
  SET_NAME_EDIT,
  SET_CONTACTS_EDIT,
  SET_BIO_EDIT,
  SET_EXPERIENCE_EDIT,
  SET_EDUCATION_EDIT,
  SET_ACHIEVEMENTS_EDIT,
  SET_CLOSE_EDITS,
} from '../types';

export const initialState = {
  name: false,
  contacts: false,
  bio: false,
  experience: false,
  education: false,
  achievements: false,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_EDIT:
      return {
        ...state,
        name: action.open,
      };
    case SET_CONTACTS_EDIT:
      return {
        ...state,
        contacts: action.open,
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
    default:
      return state;
  }
};

export default profile;
