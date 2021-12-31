import { combineReducers } from "redux";
import AuthReducer from "./authreducer";
import UserReducer from "./userreducer";

const RootReducer = combineReducers({
  AuthReducer,
  UserReducer,
});

export default RootReducer;
