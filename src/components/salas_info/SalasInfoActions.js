import axios from "axios";

export default function ListadoSalasInfo() {
  console.log('entro');
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/store/detail/J660"
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SALAS_LIST_INFO",
              data: response.data
            })
          );
        })
        .catch(error => reject({ message: error.response.data.error }))
    );
}
