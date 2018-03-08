import axios from 'axios';

import CONSTANTES from '../constants/constants';

export function listadoSalas() {
  return dispatch => new Promise(async (resolve, reject) => {
    return axios({
      method: 'GET',
      url: 'http://b2b-app.us-east-1.elasticbeanstalk.com/store/12345',
    })
      .then(async (response) => {
        resolve(dispatch({
          type: 'SALAS_LIST',
          data: response.data,
        }));
      })
      .catch(error => reject({ message: error.response.data.error }));
  });
}

export function listadoSalasWithRefresh() {
  return dispatch => new Promise(async (resolve, reject) => {
    dispatch({
      type: 'SALAS_LIST_REFRESH',
    });

    return axios({
      method: 'GET',
      url: 'http://b2b-app.us-east-1.elasticbeanstalk.com/store/12345',
    })
      .then(async (response) => {
        dispatch({
          type: 'SALAS_LIST_REFRESH',
        });

        dispatch({
          type: 'SALAS_LIST',
          data: response.data,
        });

        resolve(true);
      })
      .catch(error => reject({ message: error.response.data.error }));
  });
}

export function clearSearch() {
  return dispatch => new Promise(async (resolve) => {
    dispatch({
      type: 'SALAS_CLEAR_SEARCH',
    });

    dispatch({
      type: 'SALAS_HEADER_CLEAR_SEARCH',
    });

    resolve(true);
  });
}

export function filterSection(i = CONSTANTES.CANCEL_INDEX) {
  return dispatch => new Promise(async (resolve) => {
    resolve(dispatch({
      type: 'SALAS_FILTER_SECTION',
      filter: i,
    }));
  });
}

export function searchByName(text) {
  console.log(text);
  return dispatch => new Promise(async (resolve) => {
    dispatch({
      type: 'SALAS_SEARCH_BY_NAME',
      text,
    });

    dispatch({
      type: 'SALAS_HEADER_SEARCH_BY_NAME',
      text,
    });

    resolve(true);
  });
}
