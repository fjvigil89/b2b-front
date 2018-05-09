import axios from "axios";

export function LikePublication(idPost) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/likePost",
        data: {
          post_id: idPost
        }
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "LIKE_PUBLICATION",
              data: response.data
            })
          );
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}

export function ReloadState() {
  return dispatch =>
    new Promise(async resolve => {
      dispatch({
        type: "RELOAD_STATE_PUBLICATION"
      });

      resolve(true);
    });
}
