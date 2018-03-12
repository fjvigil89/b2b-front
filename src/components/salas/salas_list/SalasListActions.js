import axios from "axios";

export function ListadoSalas() {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/store/12345"
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SALAS_LIST",
              data: response.data
            })
          );
        })
        .catch(error => reject({ message: error.response.data.error }))
    );
}

export function ListadoSalasWithRefresh() {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      dispatch({
        type: "SALAS_LIST_REFRESH"
      });

      return axios({
        method: "GET",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/store/12345"
      })
        .then(async response => {
          dispatch({
            type: "SALAS_LIST_REFRESH"
          });

          dispatch({
            type: "SALAS_LIST",
            data: response.data
          });

          resolve(true);
        })
        .catch(error => reject({ message: error.response.data.error }));
    });
}
