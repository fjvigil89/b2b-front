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

export function ShowListForGeolocation() {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "SHOW_GEO_LOCATION"
        }),

        dispatch({
          type: "SALAS_SHOW_GEO_LOCATION"
        })
      );
    });
}

export function ShowListForLostSale() {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "SHOW_GEO_LOCATION"
        }),

        dispatch({
          type: "SALAS_SHOW_LOST_SALE"
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

export function FilterSection(i = CONSTANTES.CANCEL_INDEX, lostSaleON) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "SALAS_FILTER_SECTION",
          filter: i,
          lostSaleON
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
