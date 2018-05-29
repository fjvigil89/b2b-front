import _ from "lodash";

export const initialState = {
  loading: false,
  salas: [],
  salas_backup: [],
  groupCadena: ["Cancelar"],
  indexCancel: null,
  indexClean: null,
  searchFilters: false,
  refreshing: false,
  region: {}
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
    case "SALAS_SHOW_GEO_LOCATION": {
      let dataSalas = [];
      state.salas_backup.map( (sala, i) => {
        sala.kilometers = getKilometros(sala.latitud, sala.longitud, state.region.latitude, state.region.longitude);
        dataSalas.push(sala);
      });

      return {
        ...state,
        salas: _.orderBy(dataSalas, ['kilometers'], ['asc'])
      };
    }
    case "SALAS_SHOW_LOST_SALE": {
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

export function getKilometros(lat1,lon1,lat2,lon2) {
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137;
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return parseFloat(d.toFixed(1));
}