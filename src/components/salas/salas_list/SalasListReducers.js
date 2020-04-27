import { chain, orderBy, assign } from 'lodash';

export const initialState = {
  loading: false,
  salas: [],
  salas_backup: [],
  groupCadena: ['Cancelar'],
  indexCancel: null,
  indexClean: null,
  searchFilters: false,
  refreshing: true,
  region: {},
  activeCheckIn: false,
};

function getKilometros(lat1, lon1, lat2, lon2) {
  const rad = (x) => (x * Math.PI) / 180;

  const R = 6378.137;
  const dLat = rad(lat2 - lat1);
  const dLong = rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return parseFloat(d.toFixed(1));
}

export default function salas(state = initialState, action) {
  switch (action.type) {
    case 'SALAS_LIST': {
      if (action.data) {
        let group = [];
        group = chain(action.data)
          .groupBy('cadena')
          .map((obj, name) => name)
          .value();

        const cancel = group.push('Cancelar') - 1;
        const clean = group.push('Limpiar') - 1;

        const dataSalas = [];

        action.data.forEach((sala) => {
          let newProperties = {};

          if (sala.latitud === 0 || sala.longitud === 0) {
            newProperties = {
              kilometers: 'Sin distancia',
              prefijoKilometers: '',
            };
          } else {
            newProperties = {
              kilometers: getKilometros(
                sala.latitud,
                sala.longitud,
                state.region.latitude,
                state.region.longitude
              ),
              prefijoKilometers: 'Km',
            };
          }

          assign(sala, newProperties);

          dataSalas.push(sala);
        });

        return {
          ...state,
          salas: action.lostSaleON
            ? dataSalas
            : orderBy(dataSalas, ['kilometers'], ['asc']),
          salas_backup: dataSalas,
          groupCadena: group,
          indexCancel: cancel,
          indexClean: clean,
          refreshing: false,
        };
      }

      return initialState;
    }
    case 'SALAS_CLEAR_SEARCH': {
      return {
        ...state,
        salas: state.salas_backup,
      };
    }
    case 'SALAS_SHOW_GEO_LOCATION': {
      return {
        ...state,
        salas: orderBy(state.salas_backup, ['kilometers'], ['asc']),
        searchFilters: false,
      };
    }
    case 'SALAS_SHOW_LOST_SALE': {
      return {
        ...state,
        salas: state.salas_backup,
        searchFilters: false,
      };
    }
    case 'SALAS_FILTER_SECTION': {
      if (action.filter === state.indexCancel) {
        return state;
      }

      if (action.filter === state.indexClean) {
        return {
          ...state,
          salas: action.lostSaleON
            ? state.salas_backup
            : orderBy(state.salas_backup, ['kilometers'], ['asc']),
          searchFilters: false,
        };
      }

      const salasFiltradas = state.salas_backup.filter((item) => {
        const itemData = item.cadena.toUpperCase();
        const textData = state.groupCadena[action.filter].toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      return {
        ...state,
        salas: action.lostSaleON
          ? salasFiltradas
          : orderBy(salasFiltradas, ['kilometers'], ['asc']),
        searchFilters: true,
      };
    }
    case 'SALAS_SEARCH_BY_NAME': {
      let salasFiltradas;

      if (action.text) {
        salasFiltradas = state.salas_backup.filter((item) => {
          const itemData = item.descripcion.toUpperCase();
          const textData = action.text.toUpperCase();

          return itemData.indexOf(textData) > -1;
        });
      } else {
        salasFiltradas = state.salas_backup;
      }

      return {
        ...state,
        salas: salasFiltradas,
      };
    }
    case 'SALAS_LIST_REFRESH': {
      return {
        ...state,
        refreshing: !state.refreshing,
      };
    }
    case 'GET_LOCATION_ASYNC': {
      if (action.data) {
        return {
          ...state,
          region: {
            latitude: action.data.latitude,
            longitude: action.data.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
        };
      }

      return initialState;
    }
    case 'SALAS_ACTIVE_CHECKIN': {
      return {
        ...state,
        activeCheckIn: action.check,
      };
    }
    default:
      return state;
  }
}
