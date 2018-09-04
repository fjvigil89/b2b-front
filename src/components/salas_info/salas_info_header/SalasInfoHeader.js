import React from "react";
import { Header, Left, Body, Title, Right, Icon, Button } from "native-base";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";

class SalasInfoHeader extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      hasPoll: PropTypes.number,
      cod_local: PropTypes.string
    })
  };

  static defaultProps = {
    data: {}
  };

  showPolls = data => {
    if (data.hasPoll > 0) {
      return (
        <Right>
          <Button
            transparent
            onPress={() => {
              Actions.pollsList({ cod_local: data.cod_local });
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
      );
    }

    return <Right />;
  };

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
        {this.showPolls(this.props.data)}
      </Header>
    );
  }
}

export default SalasInfoHeader;
