import axios from "axios";

export default function GetListPoll() {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: "http://b2b-app.us-east-1.elasticbeanstalk.com/encuesta"
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_LIST_POLLS",
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