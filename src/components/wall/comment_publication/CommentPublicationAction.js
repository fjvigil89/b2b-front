import axios from "axios";

import ErrorMessages from "@constants/errors";

export default function CreateComment(postId, content) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (!content) return reject({ message: ErrorMessages.noContent });

      const formForSend = {
        post_id: postId,
        content
      };

      return axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/comment",
        data: formForSend
      })
        .then(response => {
          resolve(
            dispatch({
              type: "NEW_COMMENT",
              data: response.data
            })
          );
        })
        .catch(() => reject());
    }).catch(err => {
      throw err.message;
    });
}
