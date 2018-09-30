import axios from "axios";
import Sentry from "sentry-expo";

export function SetValidForm(obj) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: obj.type,
          data: obj
        })
      );
    });
}

export function ChangeInput(obj) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "CHANGE_INPUT",
          data: obj
        })
      );
    });
}

export function GetPoll(url, idPoll) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/encuesta/${idPoll}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_POLL",
              data: response.data
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        })
    );
}

export function SavePoll(url, form) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "POST",
        url: `${url}/encuesta`,
        data: form
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SAVE_POLL",
              data: response
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        })
    );
}
