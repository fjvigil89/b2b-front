import axios from 'axios';
import Sentry from 'sentry-expo';

export default function DetalleMedicion(url, folio) {
  const formForSend = {
    folio,
  };

  return (dispatch) => {
    dispatch({
      type: 'LOADING',
      loading: true,
    });

    new Promise(async (resolve, reject) =>
      axios({
        method: 'POST',
        url: `${url}/indicador/all`,
        data: formForSend,
      })
        .then(async (response) => {
          resolve(
            dispatch({
              type: 'MEDICION_DETALLE',
              data: response.data.data,
            })
          );
          dispatch({
            type: 'LOADING',
            loading: false,
          });
        })
        .catch((error) => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        })
    );
  }
}
