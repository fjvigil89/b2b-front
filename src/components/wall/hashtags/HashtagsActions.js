import axios from "axios";
import Sentry from "sentry-expo";

export function GetHashtags(url, hash) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/post/hashtag/${hash}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_PUBLICATIONS_HASHTAGS",
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

export function GetMoreHashtags(url, hash, lastId) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/post/hashtag/${hash}/skip/${lastId}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_PUBLICATIONS_HASHTAGS_MORE",
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
