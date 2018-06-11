import axios from "axios";

import ErrorMessages from "@constants/errors";

import GetListPost from "@components/wall/WallActions";
import { FullCommentPage } from "@components/wall/comments/CommentsActions";

export default function CreateComment(post, content) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (!content) return reject({ message: ErrorMessages.noContent });

      const formForSend = {
        post_id: post,
        content
      };

      return axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/comment",
        data: formForSend
      })
        .then(async () => {
          await dispatch(GetListPost());
          await dispatch(FullCommentPage(post));

          resolve(true);
        })
        .catch(() => {
          reject();
        });
    }).catch(err => {
      throw err.message;
    });
}
