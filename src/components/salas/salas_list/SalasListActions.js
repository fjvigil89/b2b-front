import axios from "axios";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import Sentry from "sentry-expo";

export function ListadoSalas(url, lostSaleON) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `${url}/store/`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "SALAS_LIST",
              data: response.data,
              lostSaleON
            })
          );
        })
        .catch(error => {
          Sentry.captureException(new Error(error));

          reject({ message: error.response.data.message });
        })
    );
}

export function ListadoSalasWithRefresh(url, lostSaleON) {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      dispatch({
        type: "SALAS_LIST_REFRESH"
      });

      return axios({
        method: "GET",
        url: `${url}/store/`
      })
        .then(async response => {
          dispatch({
            type: "SALAS_LIST_REFRESH"
          });

          dispatch({
            type: "SALAS_LIST",
            data: response.data,
            lostSaleON
          });

          resolve(true);
        })
        .catch(error => {
          Sentry.captureException(error);

          reject({ message: error.response.data.message });
        });
    });
}

export function GetLocationAsync() {
  return dispatch =>
    new Promise(async resolve => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const location = await Location.getCurrentPositionAsync({});

      resolve(
        dispatch({
          type: "GET_LOCATION_ASYNC",
          data: location.coords
        })
      );
    });
}
