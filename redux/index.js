import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";
import { createWrapper } from "next-redux-wrapper";

const bindMiddleware = (middleware) => {
  return applyMiddleware(...middleware);
};

export const store = createStore(
  reducer, 
  bindMiddleware(
    [ thunkMiddleware ]
  )
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, 
  // { debug: true }
);