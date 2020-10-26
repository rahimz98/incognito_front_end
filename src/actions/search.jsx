import { SET_SEARCH_RESULT, CLEAR_SEARCH_RESULT } from '../types';
import axios from 'axios';

export const getSearchResult = (query) => (dispatch) => {
  axios
    .post('https://memento-backend.herokuapp.com/api/search', { query: query })
    .then((res) => {
      dispatch({
        type: SET_SEARCH_RESULT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const clearSearchResult = () => (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_RESULT });
};
