import axios from "axios";
import { size } from "lodash";
import Sentry from "sentry-expo";

import ErrorMessages from "@constants/errors";

import { FullCommentPage } from "@components/wall/comments/CommentsActions";

export default function CreateComment(url, post, content, imagenes) {
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
          url: `${url}/comment`,
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(async () => {
            await dispatch(FullCommentPage(url, post));

            resolve(true);
          })
          .catch(error => {
            Sentry.captureException(error);

            reject({ message: error.response.data.message });
          });
      }

      if (!content) return reject({ message: ErrorMessages.noContent });

      const formForSend = {
        post_id: post,
        content
      };

      return axios({
        method: "POST",
        url: `${url}/comment`,
        data: formForSend
      })
        .then(async () => {
          await dispatch(FullCommentPage(url, post));

          resolve(true);
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    }).catch(err => {
      throw err;
    });
}
