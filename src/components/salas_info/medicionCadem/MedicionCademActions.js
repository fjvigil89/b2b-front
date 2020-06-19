import axios from 'axios';
import Sentry from 'sentry-expo';

export default function DetalleMedicion(url, folio) {
  const formForSend = {
    folio,
  };

  return (dispatch) =>
    new Promise(async (resolve, reject) =>
      axios({
        method: 'POST',
        url: `${url}/indicador/test`,
        data: formForSend,
      })
        .then(async (response) => {
          resolve(
            dispatch({
              type: 'MEDICION_DETALLE',
              data: response.data.data,
            })
          );
        })
        .catch((error) => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        })
    );
}
