import {
  SNACKBAR_SUCCESS,
  SNACKBAR_INFO,
  SNACKBAR_WARNING,
  SNACKBAR_ERROR,
  SNACKBAR_CLEAR,
} from '../types';

export const successSnackbar = (text) => (dispatch) => {
  dispatch({
    type: SNACKBAR_SUCCESS,
    text,
  });
};

export const infoSnackbar = (text) => (dispatch) => {
  dispatch({
    type: SNACKBAR_INFO,
    text,
  });
};

export const warningSnackbar = (text) => (dispatch) => {
  dispatch({
    type: SNACKBAR_WARNING,
    text,
  });
};

export const errorSnackbar = (text) => (dispatch) => {
  dispatch({
    type: SNACKBAR_ERROR,
    text,
  });
};

export const clearSnackbar = () => (dispatch) => {
  dispatch({ type: SNACKBAR_CLEAR });
};
