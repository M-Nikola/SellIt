import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import Reducers from './reducers';

const configureStore = () => {
    return createStore(Reducers, applyMiddleware(promiseMiddleware))
}

export default configureStore;