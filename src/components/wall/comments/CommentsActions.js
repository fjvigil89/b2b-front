import axios from "axios";

import { detailPost } from "@components/wall/publication/PublicationActions";

function commentsList(idPost) {
  return axios({
    method: "GET",
    url: `http://b2b-app.us-east-1.elasticbeanstalk.com/comment/post/${idPost}`
  });
}

export default function FullCommentPage(idPost) {
  return dispatch =>
    new Promise(resolve =>
      Promise.all([detailPost(idPost), commentsList(idPost)]).then(
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
