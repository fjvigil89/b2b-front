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
  ListadoSalasWithRefresh,
  GetLocationAsync
} from "@components/salas/salas_list/SalasListActions";

class SalasList extends Component {
  static propTypes = {
    GetLocationAsync: PropTypes.func.isRequired,
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
    refreshing: PropTypes.bool,
    lostSaleON: PropTypes.bool,
    endpoint: PropTypes.string,
    activeCheckin: PropTypes.bool
  };

  static defaultProps = {
    isLoading: false,
    salas: [],
    refreshing: false,
    lostSaleON: true,
    endpoint: "",
    activeCheckin: false
  };

  componentWillMount = () => {
    this.props.GetLocationAsync();
    this.props.ListadoSalas(this.props.endpoint, this.props.lostSaleON);
  };

  RefreshListadoSalas = () => {
    this.props.ListadoSalasWithRefresh(this.props.endpoint);
  };

  render = () => {
    const { isLoading, salas, refreshing, lostSaleON } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    const delay = 200;
    const detailListadoSalas = salas.map((sala, i) => (
      <SalasDetail
        data={sala}
        key={sala.folio}
        delay={delay * i}
        lostSaleON={lostSaleON}
        activeCheckin={this.props.activeCheckin}
      />
    ));

    return (
      <Content
        style={{ backgroundColor: "#F4F4F4" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.RefreshListadoSalas}
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
  refreshing: state.salas.refreshing,
  lostSaleON: state.salasHeader.lostSaleON,
  endpoint: state.user.endpoint,
  activeCheckin: state.salas.activeCheckIn
});

const mapDispatchToProps = {
  ListadoSalas,
  ListadoSalasWithRefresh,
  GetLocationAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalasList);
