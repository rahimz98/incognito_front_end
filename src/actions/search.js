import { SET_SEARCH_RESULT } from '../types';

export const successSnackbar = (text) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH_RESULT,
      text,
    });
  };
};
