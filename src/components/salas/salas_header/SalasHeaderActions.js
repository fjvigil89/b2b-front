import CONSTANTES from "@constants/constants";

export function ShowSearch() {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "SALAS_HEADER_SHOW_SEARCH"
        })
      );
    });
}

export function ShowGeoLocation(validShowGeo) {
  let typeSalas = 'SALAS_SHOW_GEO_LOCATION';
  if(validShowGeo) {
    typeSalas = 'SALAS_SHOW_LOST_SALE';
  }

  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "SHOW_GEO_LOCATION"
        }),
        
        dispatch({
          type: typeSalas
        })
      );
    });
}

export function ClearSearch() {
  return dispatch =>
    new Promise(async resolve => {
      dispatch({
        type: "SALAS_CLEAR_SEARCH"
      });

      dispatch({
        type: "SALAS_HEADER_CLEAR_SEARCH"
      });

      resolve(true);
    });
}

export function FilterSection(i = CONSTANTES.CANCEL_INDEX) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "SALAS_FILTER_SECTION",
          filter: i
        })
      );
    });
}

export function SearchByName(text) {
  return dispatch =>
    new Promise(async resolve => {
      dispatch({
        type: "SALAS_SEARCH_BY_NAME",
        text
      });

      dispatch({
        type: "SALAS_HEADER_SEARCH_BY_NAME",
        text
      });

      resolve(true);
    });
}
