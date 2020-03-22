export const UPDATE_USER = 'user:updateUser';

export function updateUser(data) {
  return {
    type: UPDATE_USER,
    payload: {
      data: data
    }
  }
}