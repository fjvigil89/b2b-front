import axios from "axios";

import { CommentList } from "@components/wall/comments/CommentsActions";

export function LikeComment(idPost, idComment) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/likeComment",
        data: {
          comment_id: idComment
        }
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}

export function UnLikeComment(idPost, idComment) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/likeComment/${idComment}`
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}

export function LikeReply(idPost, idReply) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/likeReply",
        data: {
          reply_id: idReply
        }
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}

export function UnLikeReply(idPost, idReply) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/likeReply/${idReply}`
      })
        .then(() => {
          resolve(dispatch(CommentList(idPost)));
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        );
    });
}
