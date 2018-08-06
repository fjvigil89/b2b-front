import axios from "axios";

export default function ListadoProductosCademsmart(visita) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/item/supi/${visita}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "PRODUCTOS_CADEMSMART_LIST",
              data: response.data.Items
            })
          );
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        )
    );
}
