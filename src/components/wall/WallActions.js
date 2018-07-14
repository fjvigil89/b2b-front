import axios from "axios";

export function GetListPost() {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/post/"
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_LIST_POST",
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

export function GetMorePosts(lastId) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/post/skip/${lastId}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_LIST_POST_MORE",
              data: response.data
            })
          );
        })
        .catch(error => {
          reject(error);
        })
    );
}

export function GetHashtags() {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/hashtag`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SET_HASHTAGS",
              data: response.data
            })
          );
        })
        .catch(error => {
          reject(error);
        })
    );
}
