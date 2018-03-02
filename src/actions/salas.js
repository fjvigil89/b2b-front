const ListadoSalas = () => (
  dispatch => new Promise(async (resolve) => {
    const demoListaSalas = [{
      id: 1,
      imagen: 'jumbo',
      sala: 'Jumbo Costanera',
      date: '12 de Febrero de 2018',
      estado: 1,
      cadena: 'Jumbo',
    }, {
      id: 2,
      imagen: 'tottus',
      sala: 'Tottu Plaza de Armas',
      estado: 2,
      cadena: 'Tottus',
    }, {
      id: 3,
      imagen: 'lider',
      sala: 'Lider Departamental',
      estado: 2,
      cadena: 'Lider',
    }, {
      id: 4,
      imagen: 'lider',
      sala: 'Lider La Florida',
      estado: 3,
      cadena: 'Lider',
    }];

    resolve(dispatch({
      type: 'SALAS_LIST',
      data: demoListaSalas,
    }));
  })
);

export default ListadoSalas;
