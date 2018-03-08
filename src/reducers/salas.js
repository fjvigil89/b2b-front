import CONSTANTES from '../constants/constants';

export const initialState = {
  loading: false,
  salas: [],
  salas_backup: [],
};

export default function salasReducer(state = initialState, action) {
  switch (action.type) {
    case 'SALAS_LIST': {
      if (action.data) {
        return {
          ...state,
          salas: action.data,
          salas_backup: action.data,
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
    case 'SALAS_FILTER_SECTION': {
      if (action.filter) {
        if (action.filter === CONSTANTES.CANCEL_INDEX) {
          return state;
        }

        if (action.filter === CONSTANTES.DESTRUCTIVE_INDEX) {
          return {
            ...state,
            salas: state.salas_backup,
          };
        }

        const salasFiltradas = state.salas.filter((item) => {
          const itemData = item.cadena.toUpperCase();
          const textData = CONSTANTES.OPTIONS_FILTERS_SALAS[action.filter].toUpperCase();

          return itemData.indexOf(textData) > -1;
        });

        return {
          ...state,
          salas: salasFiltradas,
        };
      }

      return state;
    }
    case 'SALAS_SEARCH_BY_NAME': {
      if (action.text) {
        let salasFiltradas;

        if (action.text) {
          salasFiltradas = state.salas.filter((item) => {
            const itemData = item.sala.toUpperCase();
            const textData = action.text.toUpperCase();

            return itemData.indexOf(textData) > -1;
          });
        } else {
          salasFiltradas = state.salas;
        }

        return {
          ...state,
          salas: salasFiltradas,
        };
      }

      return state;
    }
    default:
      return state;
  }
}
