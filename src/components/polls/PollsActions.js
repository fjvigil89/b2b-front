export function SetValidForm(obj) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: obj.type,
          data: obj
        })
      );
    });
}

export function ChangeInput(obj) {
  return dispatch =>
    new Promise(async resolve => {
      resolve(
        dispatch({
          type: "CHANGE_INPUT",
          data: obj
        })
      );
    });
}
