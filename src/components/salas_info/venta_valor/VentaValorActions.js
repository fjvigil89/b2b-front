import axios from 'axios';
import Sentry from 'sentry-expo';

export default function DetalleVentaValor(url, cod_local, retail) {
  const formForSend = {
    cod_local,
    retail,
  };

  return (dispatch) =>
    new Promise(async (resolve, reject) =>
      axios({
        method: 'POST',
        url: `${url}/ventas/tiendas`,
        data: formForSend,
      })
        .then(async (response) => {
          resolve(
            dispatch({
              type: 'VENTA_VALOR',
              data: response.data.detail,
            })
          );
        })
        .catch((error) => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        })
    );
}
