import { combineReducers } from "redux";
import authentication from "./authentication.reducer";
import dataReducer from "./data.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authentication,
  user: userReducer,
  data: dataReducer,
});

export default rootReducer;
