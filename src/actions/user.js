
import axios from 'axios';

import ErrorMessages from '../constants/errors';
import statusMessage from './status';

export function login(email, password) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    const formForSend = {
      email,
      password,
    };

    return axios({
      method: 'POST',
      url: 'https://gs8ciyujzj.execute-api.us-east-1.amazonaws.com/dev/users/login',
      data: formForSend,
    })
      .then(async (response) => {
        await statusMessage(dispatch, 'loading', false);

        resolve(dispatch({
          type: 'USER_LOGIN',
          data: response.data,
        }));
      })
      .catch(error => reject({ message: error.response.data.error }));
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

export function logout() {
  return dispatch => new Promise(async (resolve) => {
    resolve(dispatch({
      type: 'USER_LOGOUT',
    }));
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

export function changeInputLogin(name, value) {
  return dispatch => new Promise(async (resolve) => {
    resolve(dispatch({
      type: 'USER_CHANGE_INPUT',
      data: {
        name,
        value,
      },
    }));
  });
}

