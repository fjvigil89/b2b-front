import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body,
  Text
} from "native-base";
import { Actions } from "react-native-router-flux";
import { MapView } from "expo";
import GetRegionMaps from "@components/maps/MapsAction";

class Maps extends Component {
  static propTypes = {
    GetRegionMaps: PropTypes.func.isRequired,
    region: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number
    })
  };

  static defaultProps = {
    region: {}
  };

  componentWillMount = () => {
    this.props.GetRegionMaps();
  };

  render = () => {
    const { region } = this.props;
    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Maps</Title>
          </Body>
          <Right />
        </Header>

        <MapView style={{ flex: 1 }} initialRegion={region} />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  region: state.maps.region
});

const mapDispatchToProps = {
  GetRegionMaps
};

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
