import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SalasInfoHeader from "@components/salas_info/salas_info_header/SalasInfoHeader";
import SalasInfoDetail from "@components/salas_info/salas_info_detail/SalasInfoDetail";
import SalasInfoList from "@components/salas_info/salas_info_list/SalasInfoList";
import { Actions } from "react-native-router-flux";

import { ListadoSalasInfo } from "@components/salas_info/SalasInfoActions.js";

class SalasInfo extends Component {
  static propTypes = {
    ListadoSalasInfo: PropTypes.func.isRequired,
    detailsSalas: PropTypes.arrayOf
  };

  static defaultProps = {
    detailsSalas: []
  };

  componentWillMount = () => {
    console.log(Actions);
    this.props.ListadoSalasInfo();
  };

  render() {
    const { detailsSalas } = this.props;
    console.log(detailsSalas);
    return (
      <Container>
        <SalasInfoHeader />
        <Content scrollEnabled={false} style={{ backgroundColor: "#FFF" }}>
          <SalasInfoDetail />
          <SalasInfoList />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  detailsSalas: state.detailsSalas
});

const mapDispatchToProps = {
  ListadoSalasInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasInfo);
