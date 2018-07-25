import React from "react";
import { Header, Left, Body, Title, Right, Icon, Button } from "native-base";
import { Actions } from "react-native-router-flux";

class SalasInfoHeader extends React.Component {
  render() {
    return (
      <Header style={{ borderBottomWidth: 0 }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              Actions.pop();
            }}
          >
            <Icon name="arrow-back" style={{ color: "#FFFFFF" }} />
          </Button>
        </Left>
        <Body>
          <Title>Detalle de Sala</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              Actions.polls();
            }}
          >
            <Icon
              style={{
                color: "white"
              }}
              name="ios-create"
            />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default SalasInfoHeader;
