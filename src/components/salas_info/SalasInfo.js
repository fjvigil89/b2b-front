import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert, DeviceEventEmitter } from "react-native";

import SalasInfoHeader from "@components/salas_info/salas_info_header/SalasInfoHeader";
import SalasInfoDetail from "@components/salas_info/salas_info_detail/SalasInfoDetail";
import SalasInfoList from "@components/salas_info/salas_info_list/SalasInfoList";
import {
  ListadoSalasInfo,
  CheckINorCheckOUT
} from "@components/salas_info/SalasInfoActions.js";
import LoginScreen from "@components/login/Login";

class SalasInfo extends Component {
  static propTypes = {
    ListadoSalasInfo: PropTypes.func.isRequired,
    CheckINorCheckOUT: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    dataDetail: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      bandera: PropTypes.string,
      date_b2b: PropTypes.string,
      mide: PropTypes.number,
      realizada: PropTypes.number,
      fecha_visita: PropTypes.string,
      direccion: PropTypes.string,
      cod_local: PropTypes.string,
      descripcion: PropTypes.string,
      hasPoll: PropTypes.number,
      kilometers: PropTypes.number,
      visita_en_progreso: PropTypes.number,
      folio: PropTypes.number
    }),
    endpoint: PropTypes.string,
    activeCheckin: PropTypes.bool,
    km: PropTypes.number
  };

  static defaultProps = {
    isAuthenticated: false,
    isLoading: true,
    data: {
      id: 0,
      bandera: "",
      date_b2b: "",
      mide: 0,
      realizada: 0,
      fecha_visita: "",
      direccion: "",
      cod_local: "",
      descripcion: "",
      folio: 0
    },
    endpoint: "",
    activeCheckin: false,
    km: 0
  };

  async componentWillMount() {
    await this.props.ListadoSalasInfo(
      this.props.endpoint,
      this.props.data.folio
    );
  }
  componentDidMount = () => {
    if (
      this.props.data.kilometers < this.props.km &&
      !this.props.data
        .visita_en_progreso /* &&
      !this.props.activeCheckin */
    ) {
      Alert.alert(
        "¿CheckIN?",
        "Te encuentras cerca de esta sala. ¿Quieres hacer CheckIN?",
        [
          {
            text: "Hacer CheckIN",
            onPress: () => {
              this.props
                .CheckINorCheckOUT(
                  this.props.endpoint,
                  this.props.data.folio,
                  "in"
                )
                .then(() => {
                  DeviceEventEmitter.emit(
                    `checkINEvent-${this.props.data.folio}`,
                    {}
                  );

                  Alert.alert(
                    "Exito",
                    "CheckIN realizado. Recuerda hacer el CheckOUT cuando termines.",
                    [{ text: "Super!" }]
                  );
                });
            }
          },
          { text: "NO", style: "cancel" }
        ]
      );
    }
  };

  render = () => {
    const { isAuthenticated, isLoading, data } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    let { dataDetail } = this.props;

    let report = {};

    if (isLoading) {
      report = {
        cademsmartPorcentaje: "-",
        ventaPerdida: 0,
        gestionado: 0
      };

      dataDetail = [];
    } else {
      report = {
        cademsmartPorcentaje: dataDetail.cademsmart_porcentaje
          ? `${dataDetail.cademsmart_porcentaje}%`
          : "-",
        ventaPerdida: dataDetail.venta_perdida,
        gestionado: dataDetail.gestionado
      };
    }

    return (
      <Container>
        <SalasInfoHeader data={{ hasPoll: data.hasPoll, folio: data.folio }} />
        <Content
          scrollEnabled={false}
          style={{ flex: 1, backgroundColor: "#FFF" }}
          contentContainerStyle={{ flex: 1 }}
        >
          <SalasInfoDetail data={data} report={report} />
          <SalasInfoList
            data={dataDetail}
            sala={this.props.data.folio}
            nombreSala={this.props.data.descripcion}
            dateb2b={data.date_b2b}
          />
        </Content>
      </Container>
    );
  };
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  dataDetail: state.salasInfo.detailsSalas,
  isLoading: state.salasInfo.loading,
  endpoint: state.user.endpoint,
  activeCheckin: state.salas.activeCheckIn,
  km: state.user.km
});

const mapDispatchToProps = {
  ListadoSalasInfo,
  CheckINorCheckOUT
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasInfo);
