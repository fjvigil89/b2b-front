import { findIndex } from "lodash";

export const initialState = {
  position: 0,
  form: [],
  value: null,
  isError: false
};

export default function polls(state = initialState, action) {
  switch (action.type) {
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
    case "FINISH": {
      console.log(state.form);
      return {
        ...state
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
            value: state.value
          });
        } else {
          state.form[index].value = state.value;
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
        isError: false
      };
  }
}

export function objetPosition(position, obj) {
  const index = findIndex(obj, o => o.step === position);

  if (index > -1) {
    return obj[index].value;
  }
  return null;
}
