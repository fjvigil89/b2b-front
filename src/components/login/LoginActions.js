import axios from "axios";
import Sentry from "sentry-expo";

import ErrorMessages from "@constants/errors";
import MessagesAction from "@common/messages//MessagesActions";

export function Login(email, password) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      await MessagesAction(dispatch, "loading", true);

      if (!email) return reject({ message: ErrorMessages.missingEmail });
      if (!password) return reject({ message: ErrorMessages.missingPassword });

      const formForSend = {
        userId: email,
        password
      };

      return axios({
        method: "POST",
        url:
          "http://back-b2b-production.sditrmidsj.us-west-2.elasticbeanstalk.com/auth",
        data: formForSend
      })
        .then(async response => {
          await MessagesAction(dispatch, "loading", false);
          resolve(
            dispatch({
              type: "USER_LOGIN",
              data: response.data
            })
          );
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    }).catch(async err => {
      await MessagesAction(dispatch, "error", err.message);

      throw err.message;
    });
}

export function Logout() {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "USER_LOGOUT"
        })
      );
    }).catch(async err => {
      await MessagesAction(dispatch, "error", err.message);

      throw err.message;
    });
}

export function CheckToken() {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "CHECK_TOKEN"
        })
      );
    }).catch(async err => {
      await MessagesAction(dispatch, "error", err.message);

      throw err.message;
    });
}

export const ChangeInputLogin = (name, value) => dispatch => {
  return new Promise(async resolve => {
    resolve(
      dispatch({
        type: "USER_CHANGE_INPUT",
        data: {
          name,
          value
        }
      })
    );
  });
}
