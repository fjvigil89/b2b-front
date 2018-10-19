import axios from "axios";
import Sentry from "sentry-expo";

export function GetListPost(url) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/post`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_LIST_POST",
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

export function GetMorePosts(url, lastId) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/post/skip/${lastId}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_LIST_POST_MORE",
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

export function GetHashtags(url) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/hashtag`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SET_HASHTAGS",
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
