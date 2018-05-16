import axios from "axios";

import ErrorMessages from "@constants/errors";

import { CommentList } from "@components/wall/comments/CommentsActions";

export default function CreateReply(post, comment, content) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (!content) return reject({ message: ErrorMessages.noContent });

      const formForSend = {
        comment_id: comment,
        content
      };

      return axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/reply",
        data: formForSend
      })
        .then(async () => {
          resolve(dispatch(CommentList(post)));
        })
        .catch(() => {
          reject();
        });
    }).catch(err => {
      throw err.message;
    });
}
