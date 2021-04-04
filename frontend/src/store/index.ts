import thunk from 'redux-thunk';
import reducer from './reducer';
import { createStore, compose, applyMiddleware } from 'redux';

import * as actions from './actions';
import * as constants from './constants';
import * as StoreInterfaces from './interfaces';

// Add tool for browsing storage data in browser.
// It should be removed in releases.
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = {};

// Creating Store itself
const store = createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk)));


export { store, actions, constants, StoreInterfaces };

export default store;