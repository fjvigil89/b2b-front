import axios from "axios";

export function SetValidForm(obj) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: obj.type,
          data: obj
        })
      );
    });
}

export function ChangeInput(obj) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "CHANGE_INPUT",
          data: obj
        })
      );
    });
}

export function GetPoll(idPoll) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/encuesta/${idPoll}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "GET_POLL",
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
