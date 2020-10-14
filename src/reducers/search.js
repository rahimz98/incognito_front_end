import { SET_SEARCH_RESULT, CLEAR_SEARCH_RESULT } from '../types';

export const initialState = {
  results: {},
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        results: action.payload,
      };
    case CLEAR_SEARCH_RESULT:
      return initialState;
    default:
      return state;
  }
};

export default search;
