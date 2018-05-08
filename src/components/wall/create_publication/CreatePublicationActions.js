import axios from 'axios';

import ErrorMessages from '@constants/errors';

export default function CreatePost(content) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      if (!content) return reject({ message: ErrorMessages.noContent });

      const formForSend = {
        content
      };

      return axios({
        method: 'POST',
        url: 'http://b2b-app.us-east-1.elasticbeanstalk.com/post',
        data: formForSend
      })
        .then(response => {
          resolve(
            dispatch({
              type: 'NEW_POST',
              data: response.data
            })
          );
        })
        .catch(() => reject());
    }).catch(err => {
      throw err.message;
    });
}
