import axios from "axios";

export function detailPost(idPost) {
  return axios({
    method: "GET",
    url: `http://b2b-app.us-east-1.elasticbeanstalk.com/post/${idPost}`
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

export function LikePublication(idPost) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/likePost",
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
          reject(error);
        });
    });
}

export function UnLikePublication(idPost) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/likePost/${idPost}`
      })
        .then(() => {
          resolve(
            dispatch({
              type: "NO_CHANGE"
            })
          );
        })
        .catch(error => reject(error));
    });
}
