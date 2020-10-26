import { combineReducers } from 'redux';
import user from './user';
import snackbar from './snackbar';
import search from './search';
import profile from './profile';

const rootReducer = combineReducers({
  user,
  snackbar,
  search,
  profile,
});

export default rootReducer;
