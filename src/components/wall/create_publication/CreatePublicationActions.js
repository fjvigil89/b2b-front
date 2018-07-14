import axios from "axios";
import { size } from "lodash";

import ErrorMessages from "@constants/errors";

export default function CreatePost(content, imagenes, user) {
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
          url: "http://b2b-app.us-east-1.elasticbeanstalk.com/post",
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
          .catch(err => {
            reject(err);
          });
      }

      const formForSend = {
        content
      };

      return axios({
        method: "POST",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/post",
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
        .catch(err => {
          reject(err);
        });
    }).catch(err => {
      throw err;
    });
}
