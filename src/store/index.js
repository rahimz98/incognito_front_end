import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from '../reducers/index';

export const middlewares = [logger, reduxThunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;