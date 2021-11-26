import { createStore, combineReducers, applyMiddleware, compose, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';

import modal from './modal';
import UX from './UX';
import session from './session';
import errors from './errors';
import calendar from './calendar';
import accounts from './accounts';

const rootReducer = combineReducers({
  session,
  UX,
  modal,
  errors,
  calendar,
  accounts
});

let enhancer: StoreEnhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default function configureStore(preloadedState?: {}) {
  return createStore(rootReducer, preloadedState, enhancer);
}
