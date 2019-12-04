import axios from "axios";
import Sentry from "sentry-expo";

export default function ListadoProductosPorCategoriaAcccion(
  url,
  sala,
  categoria,
  accion
) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/item/${sala}/${categoria}/${accion}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "PRODUCTOS_LIST",
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
