import { createStore, compose } from 'redux';
import allReducers from './reducers';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const defaultState = {};

export default createStore(allReducers, defaultState, enhancers);
