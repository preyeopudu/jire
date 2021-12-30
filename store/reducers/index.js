import { combineReducers } from "redux";
import AuthReducer from "./authreducer";

const RootReducer = combineReducers({
  AuthReducer,
});

export default RootReducer;
