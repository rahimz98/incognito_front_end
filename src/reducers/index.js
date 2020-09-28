import { combineReducers } from 'redux';
import user from './user';
import snackbar from './snackbar';
import search from './search';

const rootReducer = combineReducers({
  user,
  snackbar,
  search,
});

export default rootReducer;
