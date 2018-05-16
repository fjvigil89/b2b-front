import axios from "axios";

import ErrorMessages from "@constants/errors";
import GetListPost from "@components/wall/WallActions";

export default function CreatePost(content) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (!content) return reject({ message: ErrorMessages.noContent });

      const formForSend = {
        content
      };

      return axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/post",
        data: formForSend
      })
        .then(() => {
          resolve(dispatch(GetListPost()));
        })
        .catch(() => reject());
    }).catch(err => {
      throw err.message;
    });
}
