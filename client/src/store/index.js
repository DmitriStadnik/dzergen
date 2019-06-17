import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import collectionReducer from "../reducers/collection-reducer";
import userReducer from "../reducers/user-reducer";
import thunk from "redux-thunk";

const combinedReducers = combineReducers({
  collection: collectionReducer,
  user: userReducer
});

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  combinedReducers,
  {
    collection: {
      page: 0,
      itemsPerPage: 9,
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