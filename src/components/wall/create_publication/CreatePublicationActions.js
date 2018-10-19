import axios from "axios";
import { size } from "lodash";
import Sentry from "sentry-expo";

import ErrorMessages from "@constants/errors";

export default function CreatePost(url, content, imagenes, user) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (!content) return reject({ message: ErrorMessages.noContent });

      if (size(imagenes) > 0) {
        const formData = new FormData();

        let counter = 0;
        imagenes.forEach(imagen => {
          const uriParts = imagen.uri.split(".");
          const fileType = uriParts[uriParts.length - 1];

          formData.append(
            `images`,
            {
              uri: imagen.uri,
              name: `imagen.${fileType}`,
              type: `image/${fileType}`
            },
            `imagen${counter}`
          );

          counter += 1;
        });

        formData.append("content", content);

        return axios({
          method: "POST",
          url: `${url}/post`,
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(response => {
            resolve(
              dispatch({
                type: "NEW_POST",
                data: response.data,
                user
              })
            );
          })
          .catch(error => {
            Sentry.captureException(error);

            reject({ message: error.response.data.message });
          });
      }

      const formForSend = {
        content
      };

      return axios({
        method: "POST",
        url: `${url}/post`,
        data: formForSend
      })
        .then(response => {
          resolve(
            dispatch({
              type: "NEW_POST",
              data: response.data,
              user
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    }).catch(err => {
      throw err;
    });
}
