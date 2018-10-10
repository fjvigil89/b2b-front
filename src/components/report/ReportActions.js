import axios from "axios";
import Sentry from "sentry-expo";

export default function ReportePorTipo(url, type) {
  console.log("Entro");

  console.log(url, type);
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/summary/${type}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "REPORT_DETAIL",
              data: response.data
            })
          );
        })
        .catch(error => {
          console.log(error);
          Sentry.captureException(new Error(error));

          reject({ message: error.response.data.message });
        })
    );
}
