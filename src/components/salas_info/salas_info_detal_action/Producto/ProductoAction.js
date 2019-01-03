import axios from "axios";
import Sentry from "sentry-expo";

export default function MarcarProducto(
  url,
  sala,
  tipo,
  causa,
  ean,
  ventaPerdida,
  dateb2b
) {
  return () =>
    new Promise(async (resolve, reject) => {
      const formForSend = {
        folio: sala,
        action: tipo,
        cause: causa,
        ean,
        ventaPerdida,
        dateB2B: dateb2b
      };

      return axios({
        method: "POST",
        url: `${url}/cases`,
        data: formForSend
      })
        .then(() => {
          resolve();
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}
