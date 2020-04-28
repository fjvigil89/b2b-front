import axios from 'axios';
import Sentry from 'sentry-expo';

export default function ListadoProductosCademsmart(url, visita) {
  return (dispatch) =>
    new Promise(async (resolve, reject) =>
      axios({
        method: 'GET',
        url: `${url}/item/supi/${visita}`,
      })
        .then(async (response) => {
          resolve(
            dispatch({
              type: 'PRODUCTOS_CADEMSMART_LIST',
              data: response.data.Items,
            })
          );
        })
        .catch((error) => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        })
    );
}
