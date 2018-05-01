export const initialState = {
  region: {}
};

export default function maps(state = initialState, action) {
  switch (action.type) {
    case "GET_REGION_MAPS": {
      return {
        ...state,
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      };

      return initialState;
    }

    default:
      return state;
  }
}
