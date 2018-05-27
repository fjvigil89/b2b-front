export const initialState = {
  region: {}
};
let _getCurrentPositionAsync;

export default  function maps(state = initialState, action) {
  switch (action.type) {
    case "GET_LOCATION_ASYNC": {
      if (action.data) {
        return {
          ...state,
          region: {
            latitude: action.data.latitude,
            longitude: action.data.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
        };
      }

      return initialState;
      
    }

    default:
      return state;
  }
}