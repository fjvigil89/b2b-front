export default function SetCurrentPosition(position) {
  console.log('logroooooo entrar');
    return dispatch =>
      new Promise(async resolve => {
        resolve(
          dispatch({
            type: "CURRENT_POSITION",
            data: position
          })
        );
      });
  }