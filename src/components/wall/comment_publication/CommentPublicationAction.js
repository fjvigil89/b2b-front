import axios from "axios";
import Sentry from "sentry-expo";

import ErrorMessages from "@constants/errors";

export default function CreateComment(url, postId, content) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (!content) return reject({ message: ErrorMessages.noContent });

      const formForSend = {
        post_id: postId,
        content
      };

      return axios({
        method: "POST",
        url: `${url}/comment`,
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
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    }).catch(err => {
      throw err.message;
    });
}
