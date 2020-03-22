import {CHANGE_PAGE, FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS, CHANGE_FILTERS} from "../actions/market-actions";

export default function marketReducer(state = {}, {type, payload}) {
  switch (type) {
    case FETCH_REQUEST:
      return state;
    case FETCH_SUCCESS:
      return {
        ...state,
        items: payload.items,
        itemsCount: payload.itemsCount
      };
    case FETCH_ERROR:
      console.error(payload);
      return state;
    case CHANGE_PAGE:
      return {
        ...state,
        page: payload.page
      };
    case CHANGE_FILTERS:
      return {
        ...state,
        filters: payload.filters
      };
    default:
      return state;
  }
}
