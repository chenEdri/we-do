import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { itemReducer } from './reducer/itemReducer';
import { userReducer } from './reducer/userReducer';
import { filterReducer } from './reducer/filterReducer';
import { systemReducer } from './reducer/systemReducer';


const rootReducer = combineReducers({
    itemReducer,
    userReducer,
    filterReducer,
    systemReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))