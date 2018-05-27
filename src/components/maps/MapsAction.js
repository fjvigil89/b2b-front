import { Constants, Location, Permissions } from 'expo';
export default function GetLocationAsync() {
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
