import axios from "axios";

export function GetHashtags(hash) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/post/hashtag/${hash}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_PUBLICATIONS_HASHTAGS",
              data: response.data
            })
          );
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        )
    );
}

export function GetMoreHashtags(hash, lastId) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/post/hashtag/${hash}/skip/${lastId}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_PUBLICATIONS_HASHTAGS_MORE",
              data: response.data
            })
          );
        })
        .catch(error => {
          reject(error);
        })
    );
}
