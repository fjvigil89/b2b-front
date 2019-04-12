import React from "react";
import { Header, Left, Body, Title, Right, Button } from "native-base";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { MaterialIcons } from '@expo/vector-icons';

class SalasInfoHeader extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      hasPoll: PropTypes.number,
      folio: PropTypes.number
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
              Actions.pollsList({ folio: data.folio });
            }}
          >
            <Ionicons
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
            <MaterialIcons
              name="arrow-back"
              style={{
                color: 'white',
                fontSize: 25
              }}
            />
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
