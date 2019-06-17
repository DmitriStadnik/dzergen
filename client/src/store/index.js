import {combineReducers, createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import collectionReducer from "../reducers/collection-reducer";
import userReducer from "../reducers/user-reducer";
import thunk from "redux-thunk";

const combinedReducers = combineReducers({
  collection: collectionReducer,
  user: userReducer
});

const allStoreEnhancers = composeWithDevTools (
  applyMiddleware(thunk)
);

const store = createStore(
  combinedReducers,
  {
    collection: {
      page: 0,
      itemsPerPage: 20,
      items: [],
      itemsCount: 0
    },
    user: {
      name: 'nouser'
    }
  },
  allStoreEnhancers
);

export default store;