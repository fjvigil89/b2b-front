import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';

export function ListadoSalas() {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: 'GET',
        url: 'http://b2b-app.us-east-1.elasticbeanstalk.com/store/'
      })
        .then(async response => {
          resolve(
            dispatch({
              type: 'SALAS_LIST',
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

export function ListadoSalasWithRefresh() {
  return dispatch =>
    new Promise(async (resolve, reject) => {
      dispatch({
        type: 'SALAS_LIST_REFRESH'
      });

      return axios({
        method: 'GET',
        url: 'http://b2b-app.us-east-1.elasticbeanstalk.com/store/'
      })
        .then(async response => {
          dispatch({
            type: 'SALAS_LIST_REFRESH'
          });

          dispatch({
            type: 'SALAS_LIST',
            data: response.data
          });

          resolve(true);
        })
        .catch(error => reject({ message: error.response.data.error }));
    });
}

export function GetLocationAsync() {
  return dispatch =>
    new Promise(async resolve => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
      const location =  await Location.getCurrentPositionAsync({});
      resolve(
        dispatch({
          type: "GET_LOCATION_ASYNC",
          data: location.coords
        })
      );
    });
}
