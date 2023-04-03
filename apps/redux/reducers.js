import { combineReducers } from "redux";
import authReducer from "./slice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
