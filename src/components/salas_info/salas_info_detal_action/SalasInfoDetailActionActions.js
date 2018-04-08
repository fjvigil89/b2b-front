import axios from "axios";

export default function ListadoProductosPorCategoriaAcccion(
  sala,
  categoria,
  accion
) {
  return dispatch =>
    new Promise(async (resolve, reject) =>
      axios({
        method: "GET",
        url: `http://b2b-app.us-east-1.elasticbeanstalk.com/item/${sala}/${categoria}/${accion}`
      })
        .then(async response => {
          resolve(
            dispatch({
              type: "PRODUCTOS_LIST",
              data: response.data
            })
          );
        })
        .catch(error =>
          reject({
            message: error.response.data.error
          })
        )
    );
}
