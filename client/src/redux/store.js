import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";

import reduxMiddlewear from "redux-thunk";
import userReducer from "./user-reducer";
import postReducer from "./post-reducer";
import friendReducer from "./friend-reducer";
import messagesReducer from "./messages-reducer";

const reducers = combineReducers({
    user: userReducer,
    post: postReducer,
    friend: friendReducer,
    messages: messagesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(reduxMiddlewear)
));
export default store;

