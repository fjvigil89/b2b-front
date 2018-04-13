import axios from "axios";

export default function ListadoSalasInfo(id) {
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
