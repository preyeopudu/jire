import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers/index";

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;
