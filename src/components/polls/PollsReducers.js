export const initialState = {
    position: 0,
};


export default function polls(state = initialState, action) {
  switch (action.type) {

    case "CURRENT_POSITION":
      {
        console.log(action.data);
        return {
          ...state,
          position: action.data
        };
      }
    default:
      return state;
  }
}