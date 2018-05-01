export default function GetRegionMaps() {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "GET_REGION_MAPS"
        })
      );
    });
}
