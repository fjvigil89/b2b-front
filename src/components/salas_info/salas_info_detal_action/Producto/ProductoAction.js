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
        url: `${url}/cases`,
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
      url: `${url}/question`
    })
      .then((res) => {
        resolve(res.data.questions);
      })
      .catch(error => {
        Sentry.captureException(error);

        reject({message: error.response.data.message});
      });
  });

export const saveFeedbackQuestions = (url, casesFeedback, imagen) => 
  new Promise((resolve, reject) => {
    let images = {};
    if (imagen) {
      const uriParts = imagen.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const filename = imagen.uri.split('/').pop();

      images = {
        uri: imagen.uri,
        name: filename,
        type: `image/${fileType}`,
        base64: imagen.base64
      }
    }

    const data = {
      casesFeedback,
      images
    };

    return axios({
      method: "POST",
      url: `${url}/cases/feedback`,
      data
    })
      .then(() => {
        resolve()
      })
      .catch(err => {
        Sentry.captureException(err);
        reject(err)
      })
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
    modal: {
      isModalVisible: false
    },
    currentProduct: {},
    image: '',
  });
};

export const setCurrentProduct = (description, ean, sala, dateb2b, venta_perdida) => (dispatch) => {
  dispatch({
    type: "SET_CURRENT_PRODUCT",
    payload: {
      description,
      ean,
      sala,
      dateb2b,
      venta_perdida
    }
  });
};

export const setPhoto = (image) => (dispatch)  => {
  dispatch({
    type: "SET_PHOTO",
    payload: {
      image
    }
  });
};
