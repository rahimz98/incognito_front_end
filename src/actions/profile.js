import {
  SET_BASIC_EDIT,
  SET_BIO_EDIT,
  SET_EXPERIENCE_EDIT,
  SET_EDUCATION_EDIT,
  SET_ACHIEVEMENTS_EDIT,
  SET_CLOSE_EDITS,
  SET_EDIT_ERROR,
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

export const editExpError = (error) => (dispatch) => {
  dispatch({ type: SET_EDIT_ERROR, expError: error });
};

export const editEduError = (error) => (dispatch) => {
  dispatch({ type: SET_EDIT_ERROR, eduError: error });
};

export const editAchvError = (error) => (dispatch) => {
  dispatch({ type: SET_EDIT_ERROR, achvError: error });
};
