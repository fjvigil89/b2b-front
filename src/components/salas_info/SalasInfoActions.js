import axios from "axios";
import Sentry from "sentry-expo";

export function ListadoSalasInfo(url, id) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      dispatch({
        type: "SALAS_LIST_INFO_LOADING"
      });

      axios({
        method: "GET",
        url: `${url}/store/${id}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SALAS_LIST_INFO",
              data: response.data
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}

export function CheckINorCheckOUT(url, storeId, type) {
  return dispatch =>
    new Promise((resolve, reject) => {
      const formForSend = {
        folio: storeId,
        type
      };

      axios({
        method: "POST",
        url: `${url}/check`,
        data: formForSend
      })
        .then(() => {
          resolve(
            dispatch({
              type: "SALAS_ACTIVE_CHECKIN",
              check: type === "in"
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}
