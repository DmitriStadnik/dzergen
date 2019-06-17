import {CHANGE_PAGE, FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS} from "../actions/collection-actions";

export default function collectionReducer(state = {}, {type, payload}) {
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
    default:
      return state;
  }
}
