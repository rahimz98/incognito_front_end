import { SET_SEARCH_RESULT } from '../types';

export const initialState = {
  results: null,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
};

export default search;
