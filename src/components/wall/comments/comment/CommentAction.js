import axios from "axios";
import Sentry from "sentry-expo";

import { CommentList } from "@components/wall/comments/CommentsActions";

export function LikeComment(url, idPost, idComment) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${url}/likeComment`,
        data: {
          comment_id: idComment
        }
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}

export function UnLikeComment(url, idPost, idComment) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${url}/likeComment/${idComment}`
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}

export function LikeReply(url, idPost, idReply) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${url}/likeReply`,
        data: {
          reply_id: idReply
        }
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}

export function UnLikeReply(url, idPost, idReply) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `${url}/likeReply/${idReply}`
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}
