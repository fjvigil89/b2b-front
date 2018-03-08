export default function () {
  return dispatch => new Promise(async (resolve) => {
    resolve(dispatch({
      type: 'SALAS_HEADER_SHOW_SEARCH',
    }));
  });
}
