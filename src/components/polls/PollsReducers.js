import { findIndex, forEach } from "lodash";
import Item from "@assets/native-base-theme/components/Item";

export const initialState = {
  position: 0,
  form: [],
  value: null,
  isError: false,
  msg: '',
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
          msg: '',
          dataPoll: action.data,
          lengthPoll: action.data.length,
          isLoading: false,
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
        msg: '',
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
      if (!state.value) {
        return {
          ...state,
          isError: true,
          msg: '* Debe completar el formulario'
        };
      } else if (validErrorInput(state.value, state.dataPoll[action.data.position].response)) {
        return {
          ...state,
          msg: '* Debe ingresar el dato correcto',
          isError: true
        };
      }

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
        msg: '',
        value: null,
        form,
        isFinish: true
      };

    }

    case "NEXT_POSITION": {
      if (!state.value) {
        return {
          ...state,
          isError: true,
          msg: '* Debe completar el formulario'
        };
      } else if (validErrorInput(state.value, state.dataPoll[action.data.position].response)) {
        return {
          ...state,
          msg: '* Debe ingresar el dato correcto',
          isError: true
        };
      }

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
        msg: '',
        value
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
        msg: '',
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


export function validErrorInput(input, type) {
  if (type === "number") {
    return isNaN(input);
  }

  return !input;
}
