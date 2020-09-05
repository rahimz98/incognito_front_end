import { SNACKBAR_SUCCESS, SNACKBAR_INFO, SNACKBAR_WARNING, SNACKBAR_ERROR, SNACKBAR_CLEAR } from "../types/snackbar";

const snackbar = (state={}, action) => {
  switch (action.type) {
    case SNACKBAR_SUCCESS: 
      return {
        ...state,
        open: true,
        type: 'success',
        text: action.text
      };
    case SNACKBAR_INFO: 
      return {
        ...state,
        open: true,
        type: 'info',
        text: action.text
      };
    case SNACKBAR_WARNING: 
      return {
        ...state,
        open: true,
        type: 'warning',
        text: action.text
      };
    case SNACKBAR_ERROR: 
      return {
        ...state,
        open: true,
        type: 'error',
        text: action.text
      };
    case SNACKBAR_CLEAR: 
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}

export default snackbar;
