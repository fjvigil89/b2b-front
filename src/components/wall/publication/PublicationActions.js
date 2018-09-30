import axios from "axios";
import Sentry from "sentry-expo";

export function detailPost(url, idPost) {
  return axios({
    method: "GET",
    url: `${url}/post/${idPost}`
  });
}

export function DetailPublication(idPost) {
  return dispatch =>
    new Promise(resolve =>
      detailPost(idPost).then(async results => {
        const post = results.data;

        resolve(
          dispatch({
            type: "DETAIL_PUBLICATION",
            data: post
          })
        );
      })
    );
}

export function LikePublication(url, idPost) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${url}/likePost`,
        data: {
          post_id: idPost
        }
      })
        .then(() => {
          resolve(
            dispatch({
              type: "NO_CHANGE"
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}

export function UnLikePublication(url, idPost) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${url}/likePost/${idPost}`
      })
        .then(() => {
          resolve(
            dispatch({
              type: "NO_CHANGE"
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}
