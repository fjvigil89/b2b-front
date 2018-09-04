import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "react-native";

import SalasInfoHeader from "@components/salas_info/salas_info_header/SalasInfoHeader";
import SalasInfoDetail from "@components/salas_info/salas_info_detail/SalasInfoDetail";
import SalasInfoList from "@components/salas_info/salas_info_list/SalasInfoList";
import {
  ListadoSalasInfo,
  CheckINorCheckOUT
} from "@components/salas_info/SalasInfoActions.js";

class SalasInfo extends Component {
  static propTypes = {
    ListadoSalasInfo: PropTypes.func.isRequired,
    CheckINorCheckOUT: PropTypes.func.isRequired,
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
      visita_en_progreso: PropTypes.number
    })
  };

  static defaultProps = {
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
      descripcion: ""
    }
  };

  async componentWillMount() {
    await this.props.ListadoSalasInfo(this.props.data.cod_local);
  }
  componentDidMount = () => {
    if (
      this.props.data.kilometers < 5.5 &&
      !this.props.data.visita_en_progreso
    ) {
      Alert.alert(
        "¿CheckIN?",
        "Te encuentras cerca de esta sala. ¿Quieres hacer CheckIN?",
        [
          {
            text: "Hacer CheckIN",
            onPress: () => {
              this.props
                .CheckINorCheckOUT(this.props.data.cod_local)
                .then(() => {
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
    const { isLoading, data } = this.props;
    let { dataDetail } = this.props;

    let report = {};

    if (isLoading) {
      report = {
        cademsmartPorcentaje: "-",
        ventaPerdida: 0
      };

      dataDetail = [];
    } else {
      report = {
        cademsmartPorcentaje: dataDetail.cademsmart_porcentaje
          ? `${dataDetail.cademsmart_porcentaje}%`
          : "-",
        ventaPerdida: dataDetail.venta_perdida
      };
    }
    return (
      <Container>
        <SalasInfoHeader
          data={{ hasPoll: data.hasPoll, cod_local: data.cod_local }}
        />
        <Content
          scrollEnabled={false}
          style={{ flex: 1, backgroundColor: "#FFF" }}
          contentContainerStyle={{ flex: 1 }}
        >
          <SalasInfoDetail data={data} report={report} />
          <SalasInfoList
            data={dataDetail}
            sala={this.props.data.cod_local}
            nombreSala={this.props.data.descripcion}
          />
        </Content>
      </Container>
    );
  };
}
const mapStateToProps = state => ({
  dataDetail: state.salasInfo.detailsSalas,
  isLoading: state.salasInfo.loading
});

const mapDispatchToProps = {
  ListadoSalasInfo,
  CheckINorCheckOUT
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalasInfo);
