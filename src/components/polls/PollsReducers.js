import { findIndex, forEach } from "lodash";
import Item from "@assets/native-base-theme/components/Item";

export const initialState = {
  position: 0,
  form: [],
  value: null,
  isError: false,
  dataPoll: [],
  lengthPoll: 0,
  isLoading: true,
  isFinish: false
};

export default function polls(state = initialState, action) {
  switch (action.type) {
    case "GET_POLL": {
      if (action.data) {
        return {
          ...state,
          position: 0,
          form: [],
          value: null,
          isError: false,
          dataPoll: action.data,
          lengthPoll: action.data.length,
          isLoading: false
        };
      }

      return initialState;
    }
    case "PREVIOUS_POSITION": {
      const position = action.data.position - 1;
      const value = objetPosition(position, state.form);
      return {
        ...state,
        position,
        isError: false,
        value
      };
    }
    case "SAVE_POLL": {
      return {
        ...state,
        form: null,
        isFinish: false
      };
    }
    case "FINISH": {
      if (state.value) {
        const index = findIndex(
          state.form,
          o => o.step === action.data.position
        );

        if (index === -1) {
          state.form.push({
            step: action.data.position,
            id: state.dataPoll[action.data.position].id,
            respuesta: state.value
          });
        } else {
          state.form[index].respuesta = state.value;
        }
        const position = action.data.position + 1;

        const form = state.form.map(item => ({
          id: item.id,
          respuesta: item.respuesta
        }));

        return {
          ...state,
          position,
          isError: false,
          value: null,
          form,
          isFinish: true
        };
      }

      return {
        ...state,
        isError: true
      };
    }

    case "NEXT_POSITION": {
      if (state.value) {
        const index = findIndex(
          state.form,
          o => o.step === action.data.position
        );

        if (index === -1) {
          state.form.push({
            step: action.data.position,
            id: state.dataPoll[action.data.position].id,
            respuesta: state.value
          });
        } else {
          state.form[index].respuesta = state.value;
        }
        const position = action.data.position + 1;
        const value = objetPosition(position, state.form);
        return {
          ...state,
          position,
          isError: false,
          value
        };
      }

      return {
        ...state,
        isError: true
      };
    }
    case "CHANGE_INPUT": {
      return {
        ...state,
        value: action.data.value,
        position: action.data.position
      };
    }
    default:
      return {
        ...state,
        position: 0,
        form: [],
        value: null,
        isError: false,
        lengthPoll: 0,
        dataPoll: [],
        isLoading: true
      };
  }
}

export function objetPosition(position, obj) {
  const index = findIndex(obj, o => o.step === position);

  if (index > -1) {
    return obj[index].respuesta;
  }
  return null;
}
