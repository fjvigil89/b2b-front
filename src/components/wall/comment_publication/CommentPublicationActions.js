import axios from "axios";
import { size } from "lodash";

import ErrorMessages from "@constants/errors";

import { GetListPost } from "@components/wall/WallActions";
import { FullCommentPage } from "@components/wall/comments/CommentsActions";

export default function CreateComment(post, content, imagenes) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (size(imagenes) > 0) {
        const formData = new FormData();

        let counter = 0;
        imagenes.forEach(imagen => {
          const uriParts = imagen.uri.split(".");
          const fileType = uriParts[uriParts.length - 1];

          formData.append(
            `image`,
            {
              uri: imagen.uri,
              name: `imagen.${fileType}`,
              type: `image/${fileType}`
            },
            `imagen${counter}`
          );

          counter += 1;
        });

        formData.append("post_id", post);

        if (content) formData.append("content", content);

        return axios({
          method: "POST",
          url: "http://b2b-app.us-east-1.elasticbeanstalk.com/comment",
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(async () => {
            await dispatch(GetListPost());
            await dispatch(FullCommentPage(post));

            resolve(true);
          })
          .catch(err => {
            reject(err);
          });
      }

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
        .catch(err => {
          reject(err);
        });
    }).catch(err => {
      throw err;
    });
}
