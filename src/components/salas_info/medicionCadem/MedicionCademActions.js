import axios from 'axios';
import Sentry from 'sentry-expo';

export default function DetalleMedicion(folio) {
  const formForSend = {
    folio,
  };

  return (dispatch) =>
    new Promise(async (resolve, reject) =>
      axios({
        method: 'POST',
        url: `${url}/medicion/tiendas`,
        data: formForSend,
      })
        .then(async (response) => {
          resolve(
            dispatch({
              type: 'MEDICION_DETALLE',
              data: response.data,
            })
          );
        })
        .catch((error) => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        })
    );
}
