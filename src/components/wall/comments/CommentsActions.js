import axios from "axios";

export function GetListComments(idComment) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/comment/post/${idComment}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_LIST_COMMENTS",
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
