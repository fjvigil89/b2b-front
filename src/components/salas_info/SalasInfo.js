import React, { Component } from "react";
import { Container, Content } from "native-base";

import SalasInfoHeader from "@components/salas_info/salas_info_header/SalasInfoHeader";
import SalasInfoDetail from "@components/salas_info/salas_info_detail/SalasInfoDetail";
import SalasInfoList from "@components/salas_info/salas_info_list/SalasInfoList";

class SalasInfo extends Component {
  static propTypes = {};

  render() {
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

export default SalasInfo;
