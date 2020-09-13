import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from '../reducers/index';

const middlewares = [logger, reduxThunk];

const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(...middlewares), 
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;