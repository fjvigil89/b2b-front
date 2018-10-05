import axios from "axios";
import Sentry from "sentry-expo";

export default function GetListPoll(url, params) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/encuesta${params}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_LIST_POLLS",
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
