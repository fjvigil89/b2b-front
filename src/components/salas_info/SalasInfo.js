import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SalasInfoHeader from "@components/salas_info/salas_info_header/SalasInfoHeader";
import SalasInfoDetail from "@components/salas_info/salas_info_detail/SalasInfoDetail";
import SalasInfoList from "@components/salas_info/salas_info_list/SalasInfoList";
import ListadoSalasInfo from "@components/salas_info/SalasInfoActions.js";

class SalasInfo extends Component {
  static propTypes = {
    ListadoSalasInfo: PropTypes.func.isRequired,
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
      descripcion: PropTypes.string
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
    console.log(this.props.data);
    await this.props.ListadoSalasInfo(this.props.data.cod_local);
  }

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
        <SalasInfoHeader />
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
  ListadoSalasInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalasInfo);
