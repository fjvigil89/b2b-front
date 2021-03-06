import axios from "axios";

import { detailPost } from "@components/wall/publication/PublicationActions";

function commentsList(url, idPost) {
  return axios({
    method: "GET",
    url: `${url}/comment/post/${idPost}`
  });
}

export function FullCommentPage(url, idPost) {
  return dispatch =>
    new Promise(resolve =>
      Promise.all([detailPost(url, idPost), commentsList(url, idPost)]).then(
        async results => {
          const post = results[0].data;
          const listComments = results[1].data;

          await dispatch({
            type: "GET_LIST_COMMENTS",
            data: listComments
          });

          await dispatch({
            type: "DETAIL_PUBLICATION",
            data: post
          });

          resolve(true);
        }
      )
    );
}

export function CommentList(url, idPost) {
  return dispatch =>
    new Promise(resolve =>
      commentsList(url, idPost).then(async results => {
        const listComments = results.data;

        resolve(
          dispatch({
            type: "GET_LIST_COMMENTS",
            data: listComments
          })
        );
      })
    );
}
