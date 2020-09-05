import { combineReducers  } from 'redux';
import user from './user';
import snackbar from './snackbar';

const rootReducer = combineReducers({
  user,
  snackbar
});

export default rootReducer;