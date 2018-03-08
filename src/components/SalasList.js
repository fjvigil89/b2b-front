import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content } from 'native-base';
import { RefreshControl } from 'react-native';

import Loading from '../components/Loading';
import SalaDetail from '../components/SalaDetail';
import NoSalas from '../components/NoSalas';

import { listadoSalas, listadoSalasWithRefresh } from '../actions/salas';

class SalasList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    salas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      bandera: PropTypes.string,
      date_b2b: PropTypes.string,
      mide: PropTypes.number,
      realizada: PropTypes.number,
      fecha_visita: PropTypes.string,
      direccion: PropTypes.string,
    })),
    listadoSalas: PropTypes.func.isRequired,
    listadoSalasWithRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
    salas: [],
    refreshing: false,
  }

  componentWillMount = () => {
    this.props.listadoSalas();
  };

  render = () => {
    const { isLoading, salas, refreshing } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    const delay = 200;

    const detailListadoSalas = salas.map((sala, i) => (
      <SalaDetail data={sala} key={sala.cod_local} delay={delay * i} />
    ));

    return (
      <Content
        style={{ backgroundColor: '#F4F4F4' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.props.listadoSalasWithRefresh}
            title="Recargar Salas..."
          />
        }
      >
        {salas.length !== 0 ?
          detailListadoSalas
          :
          <NoSalas />
        }
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  salas: state.salas.salas,
  isLoading: state.salas.loading,
  refreshing: state.salasList.refreshing,
});

const mapDispatchToProps = {
  listadoSalas,
  listadoSalasWithRefresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasList);
