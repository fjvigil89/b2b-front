import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Content } from "native-base";
import { RefreshControl } from "react-native";

import Loading from "@components/loading/Loading";
import SalasDetail from "@components/salas/salas_detail/SalasDetail";
import NoSalas from "@components/salas/salas_empty/SalasEmpty";

import {
  ListadoSalas,
  ListadoSalasWithRefresh
} from "@components/salas/salas_list/SalasListActions";

class SalasList extends Component {
  static propTypes = {
    ListadoSalas: PropTypes.func.isRequired,
    ListadoSalasWithRefresh: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    salas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        bandera: PropTypes.string,
        date_b2b: PropTypes.string,
        mide: PropTypes.number,
        realizada: PropTypes.number,
        fecha_visita: PropTypes.string,
        direccion: PropTypes.string
      })
    ),
    refreshing: PropTypes.bool
  };

  static defaultProps = {
    isLoading: false,
    salas: [],
    refreshing: false
  };

  componentWillMount = () => {
    this.props.ListadoSalas();
  };

  render = () => {
    const { isLoading, salas, refreshing } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    const delay = 200;

    const detailListadoSalas = salas.map((sala, i) => (
      <SalasDetail data={sala} key={sala.cod_local} delay={delay * i} />
    ));

    return (
      <Content
        style={{ backgroundColor: "#F4F4F4" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.props.ListadoSalasWithRefresh}
            title="Recargar Salas..."
          />
        }
      >
        {salas.length !== 0 ? detailListadoSalas : <NoSalas />}
      </Content>
    );
  };
}

const mapStateToProps = state => ({
  salas: state.salas.salas,
  isLoading: state.salas.loading,
  refreshing: state.salas.refreshing
});

const mapDispatchToProps = {
  ListadoSalas,
  ListadoSalasWithRefresh
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasList);
