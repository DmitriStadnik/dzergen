import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import collectionReducer from "../reducers/collection-reducer";
import marketReducer from "../reducers/market-reducer";
import userReducer from "../reducers/user-reducer";
import thunk from "redux-thunk";

const combinedReducers = combineReducers({
  collection: collectionReducer,
  market: marketReducer,
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
      itemsPerPage: 30,
      items: [],
      itemsCount: 0,
      filters: {
        name: '',
        rarity: 5
      }
    },
    market: {
      page: 0,
      itemsPerPage: 30,
      items: [],
      itemsCount: 0,
      filters: {
        name: '',
        rarity: 5
      }
    },
    user: {
      data: {
        currency: {
          z: 0,
          coin: 0
        }
      }
    }
  },
  allStoreEnhancers
);

export default store;