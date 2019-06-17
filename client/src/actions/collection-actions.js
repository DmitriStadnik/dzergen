import collectionRequests from '../requests/collection-requests';

export const FETCH_REQUEST = 'collection:FETCH_REQUEST';
export const FETCH_SUCCESS = 'collection:FETCH_SUCCESS';
export const FETCH_ERROR = 'collection:FETCH_ERROR';
export const CHANGE_PAGE = 'collection:CHANGE_PAGE';

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

export function fetchCollection (page, count) {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    return collectionRequests.getItems(page, count)
      .then(response => {
        dispatch(fetchPostsSuccess({
          items: response.data.data,
          itemsCount: response.data.count
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