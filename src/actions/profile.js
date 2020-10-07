import {
  SET_BASIC_EDIT,
  SET_BIO_EDIT,
  SET_EXPERIENCE_EDIT,
  SET_EDUCATION_EDIT,
  SET_ACHIEVEMENTS_EDIT,
  SET_CLOSE_EDITS,
} from '../types';

export const editBasic = (open) => (dispatch) => {
  dispatch({
    type: SET_BASIC_EDIT,
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
