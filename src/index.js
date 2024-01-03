import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from "redux";
import * as thunk from 'redux-thunk'
import reducer from "./reducer";
import App from "./components/app/app";

const root = ReactDOM.createRoot(document.getElementById('root'));

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const loggerMiddelware = store => next => action => {
    const res = next(action);
    return res;
}
const store = createStore(reducer, composeEnhancers(applyMiddleware(
    loggerMiddelware,
    thunk.thunk
)));

root.render(
    <Provider store={store}>
        <App></App>
    </Provider>
);
















