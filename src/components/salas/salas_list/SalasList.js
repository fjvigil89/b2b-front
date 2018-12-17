import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Content } from "native-base";
import { RefreshControl } from "react-native";

import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";
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
    salas: [],
    refreshing: false,
    lostSaleON: true,
    endpoint: "",
    activeCheckin: false
  };

  state = {
    loading: false
  };

  componentWillMount = () => {
    this.props.GetLocationAsync();

    this.setState({
      loading: true
    });

    this.props
      .ListadoSalas(this.props.endpoint, this.props.lostSaleON)
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  RefreshListadoSalas = () => {
    this.setState({
      loading: true
    });

    this.props
      .ListadoSalasWithRefresh(this.props.endpoint, this.props.lostSaleON)
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render = () => {
    const { salas, refreshing, lostSaleON } = this.props;

    console.log(salas[0]);

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
        {this.state.loading && <LoadingOverlay />}
      </Content>
    );
  };
}

const mapStateToProps = state => ({
  salas: state.salas.salas,
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

export default connect(mapStateToProps, mapDispatchToProps)(SalasList);
