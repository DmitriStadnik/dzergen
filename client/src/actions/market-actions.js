import collectionRequests from '../requests/market-requests';
import Functions from '../utils/Functions';

export const FETCH_REQUEST = 'market:FETCH_REQUEST';
export const FETCH_SUCCESS = 'market:FETCH_SUCCESS';
export const FETCH_ERROR = 'market:FETCH_ERROR';
export const CHANGE_PAGE = 'market:CHANGE_PAGE';
export const CHANGE_FILTERS = 'market:CHANGE_FILTERS';

function fetchPostsRequest(){
  return {
    type: FETCH_REQUEST
  }
}

function fetchPostsSuccess(payload) {
  return {
    type: FETCH_SUCCESS,
    payload
  }
}

function fetchPostsError(payload) {
  return {
    type: FETCH_ERROR,
    payload
  }
}

export function fetchMarket (page, count, filters, noOwner) {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    return collectionRequests.getItems({
      page,
      count,
      noOwner,
      ...Functions.composeFilters(filters)
    })
      .then(response => {
        dispatch(fetchPostsSuccess({
          items: response.data.data,
          itemsCount: response.data.count,
        }));
      })
      .catch(e => fetchPostsError(e))
  };
}

export function changePage (page) {
  return {
    type: CHANGE_PAGE,
    payload: {
      page: page
    }
  }
}

export function changeFilters (filters) {
  return {
    type: CHANGE_FILTERS,
    payload: {
      filters: filters
    }
  }
}