import axios from "axios";
import Sentry from "sentry-expo";

export default function MarcarProducto(
  url,
  sala,
  tipo,
  causa,
  ean,
  ventaPerdida,
  dateb2b
) {
  return () =>
    new Promise(async (resolve, reject) => {
      const formForSend = {
        folio: sala,
        action: tipo,
        cause: causa,
        ean,
        ventaPerdida,
        dateB2B: dateb2b
      };

      return axios({
        method: "POST",
        url: `${ url }/cases`,
        data: formForSend
      })
        .then((res) => {
          resolve(res.data.caseId);
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({message: error.response.data.message});
        });
    });
}

export const getQuestions = (url) =>
  new Promise(async (resolve, reject) => {
    axios({
      method: "GET",
      url: `${ url }/question`
    })
      .then((res) => {
        resolve(res.data.questions);
      })
      .catch(error => {
        Sentry.captureException(error);

        reject({message: error.response.data.message});
      });
  });

export const saveFeedbackQuestions = (url, casesFeedback) =>
  new Promise(async (resolve, reject) => {
    axios({
      method: "POST",
      url: `${ url }/cases/feedback`,
      data: casesFeedback
    })
      .then(() => {
        resolve();
      })
      .catch(error => {
        Sentry.captureException(error);

        reject({message: 'Error al guardar el feedback'});
      });
  });

export const modalShow = () => (dispatch) => {
  dispatch({
    type: "SHOW_MODAL",
    isModalVisible: true
  });
};

export const modalHide = () => (dispatch) => {
  dispatch({
    type: "HIDE_MODAL",
    isModalVisible: false
  });
};

export const setCurrentProduct = (description, ean) => (dispatch) => {
  dispatch({
    type: "SET_CURRENT_PRODUCT",
    payload: {
      description,
      ean
    }
  });
};
