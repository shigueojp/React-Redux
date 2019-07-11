import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import counterReducer from './store/reducers/counter'
import resultReducer from './store/reducers/result'
import { Provider } from 'react-redux'

//Asyncronous Code
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
})

// MIDDLEWARE
const logger = (store) => {
    //RETURNS A FUNCTION with NEXT
    return (next) => {
        //RETURNS A FUNCTION MIDDLEWARE
        return (action) => {
            console.log('[MIDDLEWARE] Dispatching', action)
            // To Dispatch the action do the reducer
            const result = next(action);
            console.log('[MIDDLEWARE] next state', store.getState())
            return result;
        }
    }
}

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
