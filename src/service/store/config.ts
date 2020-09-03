import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'; 
import {reducer} from './reducer';

export const configureStore = (): any => {
    return createStore (reducer, composeWithDevTools(applyMiddleware(thunk)))
};