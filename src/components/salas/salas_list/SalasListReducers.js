import _ from "lodash";

export const initialState = {
  loading: false,
  salas: [],
  salas_backup: [],
  groupCadena: ["Cancelar"],
  indexCancel: null,
  indexClean: null,
  searchFilters: false,
  refreshing: false
};

export default function salas(state = initialState, action) {
  switch (action.type) {
    case "SALAS_LIST": {
      if (action.data) {
        let group = [];
        group = _.chain(action.data)
          .groupBy("cadena")
          .map((obj, name) => name)
          .value();

        const cancel = group.push("Cancelar") - 1;
        const clean = group.push("Limpiar") - 1;

        return {
          ...state,
          salas: action.data,
          salas_backup: action.data,
          groupCadena: group,
          indexCancel: cancel,
          indexClean: clean,
          refreshing: false
        };
      }

      return initialState;
    }
    case "SALAS_CLEAR_SEARCH": {
      return {
        ...state,
        salas: state.salas_backup
      };
    }
    case "SALAS_FILTER_SECTION": {
      if (action.filter === state.indexCancel) {
        return state;
      }

      if (action.filter === state.indexClean) {
        return {
          ...state,
          salas: state.salas_backup,
          searchFilters: false
        };
      }

      const salasFiltradas = state.salas_backup.filter(item => {
        const itemData = item.cadena.toUpperCase();
        const textData = state.groupCadena[action.filter].toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      return {
        ...state,
        salas: salasFiltradas,
        searchFilters: true
      };
    }
    case "SALAS_SEARCH_BY_NAME": {
      let salasFiltradas;

      if (action.text) {
        salasFiltradas = state.salas_backup.filter(item => {
          const itemData = item.descripcion.toUpperCase();
          const textData = action.text.toUpperCase();

          return itemData.indexOf(textData) > -1;
        });
      } else {
        salasFiltradas = state.salas_backup;
      }

      return {
        ...state,
        salas: salasFiltradas
      };
    }
    case "SALAS_LIST_REFRESH": {
      return {
        ...state,
        refreshing: !state.refreshing
      };
    }
    default:
      return state;
  }
}
