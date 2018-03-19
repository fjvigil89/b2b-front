import React from "react";
import { Header, Left, Body, Title, Right } from "native-base";

class SalasInfoHeader extends React.Component {
  render() {
    return (
      <Header style={{ borderBottomWidth: 0 }}>
        <Left />
        <Body>
          <Title>Detalle de Sala</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default SalasInfoHeader;
