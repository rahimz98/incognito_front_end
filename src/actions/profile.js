import {
  SET_NAME_EDIT,
  SET_CONTACTS_EDIT,
  SET_BIO_EDIT,
  SET_EXPERIENCE_EDIT,
  SET_EDUCATION_EDIT,
  SET_ACHIEVEMENTS_EDIT,
  SET_CLOSE_EDITS,
} from '../types';

export const editName = (open) => (dispatch) => {
  dispatch({
    type: SET_NAME_EDIT,
    open: open,
  });
};

export const editContacts = (open) => (dispatch) => {
  dispatch({
    type: SET_CONTACTS_EDIT,
    open: open,
  });
};

export const editBio = (open) => (dispatch) => {
  dispatch({
    type: SET_BIO_EDIT,
    open: open,
  });
};

export const editExperience = (open) => (dispatch) => {
  dispatch({
    type: SET_EXPERIENCE_EDIT,
    open: open,
  });
};

export const editEducation = (open) => (dispatch) => {
  dispatch({
    type: SET_EDUCATION_EDIT,
    open: open,
  });
};

export const editAchievements = (open) => (dispatch) => {
  dispatch({
    type: SET_ACHIEVEMENTS_EDIT,
    open: open,
  });
};

export const closeEdits = () => (dispatch) => {
  dispatch({ type: SET_CLOSE_EDITS });
};
