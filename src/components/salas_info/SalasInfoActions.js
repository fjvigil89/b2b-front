import axios from "axios";

export function ListadoSalasInfo(id) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      dispatch({
        type: "SALAS_LIST_INFO_LOADING"
      });

      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/store/${id}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SALAS_LIST_INFO",
              data: response.data
            })
          );
        })
        .catch(error => reject({ message: error.response.data.error }));
    });
}

export function CheckINorCheckOUT(storeId) {
  return () =>
    new Promise((resolve, reject) => {
      const formForSend = {
        storeId
      };

      axios({
        method: "POST",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/check`,
        data: formForSend
      })
        .then(() => {
          resolve();
        })
        .catch(error => reject(error));
    });
}
