import axios from "axios";

import GetListPost from "@components/wall/WallActions";

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
    new Promise(async (resolve, reject) => {
      axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/likePost",
        data: {
          post_id: idPost
        }
      })
        .then(async () => {
          await dispatch(GetListPost());

          await dispatch(DetailPublication(idPost));

          resolve(true);
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}

export function UnLikePublication(idPost) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      axios({
        method: "DELETE",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/likePost/${idPost}`
      })
        .then(async () => {
          await dispatch(GetListPost());

          await dispatch(DetailPublication(idPost));

          resolve(true);
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}
