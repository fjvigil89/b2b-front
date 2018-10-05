import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import { MapView } from "expo";

import {
  ListadoSalas,
  GetLocationAsync
} from "@components/salas/salas_list/SalasListActions";
import LoginScreen from "@components/login/Login";

class Maps extends Component {
  static propTypes = {
    GetLocationAsync: PropTypes.func.isRequired,
    ListadoSalas: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    region: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number
    }),
    salas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        bandera: PropTypes.string,
        date_b2b: PropTypes.string,
        mide: PropTypes.number,
        realizada: PropTypes.number,
        fecha_visita: PropTypes.string,
        direccion: PropTypes.string,
        latitud: PropTypes.any,
        longitud: PropTypes.an
      })
    ),
    endpoint: PropTypes.string
  };

  static defaultProps = {
    region: {},
    salas: [],
    isAuthenticated: false,
    endpoint: ""
  };

  componentWillMount = () => {
    this.props.GetLocationAsync();
    this.props.ListadoSalas(this.props.endpoint);
  };

  currency = x => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  render = () => {
    const { salas, region, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

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
        <MapView style={{ flex: 1 }} region={region} showsUserLocation>
          {salas.map(sala => {
            if (sala.latitud && sala.longitud) {
              let logo = "";
              if (sala.bandera === "JUMBO") {
                logo = require("@assets/images/jumbo.png");
              } else if (
                sala.bandera === "LIDER EXPRESS" ||
                sala.bandera === "LIDER"
              ) {
                logo = require("@assets/images/lider.png");
              } else if (sala.bandera === "CENTRAL MAYORISTA") {
                logo = require("@assets/images/central-mayorista.png");
              } else if (sala.bandera === "TOTTUS") {
                logo = require("@assets/images/tottus.png");
              } else if (sala.bandera === "EKONO") {
                logo = require("@assets/images/ekono.png");
              } else if (sala.bandera === "ACUENTA") {
                logo = require("@assets/images/acuenta.png");
              } else if (sala.bandera === "SANTA ISABEL") {
                logo = require("@assets/images/santaisabel.png");
              } else if (sala.bandera === "UNIMARC") {
                logo = require("@assets/images/unimarc.png");
              } else if (sala.bandera === "MAYORISTA 10") {
                logo = require("@assets/images/mayorista10.png");
              } else if (sala.bandera === "ALVI") {
                logo = require("@assets/images/alvi.png");
              } else {
                logo = require("@assets/images/alvi.png");
              }

              return (
                <MapView.Marker.Animated
                  draggable
                  key={sala.folio}
                  coordinate={{
                    latitude: sala.latitud,
                    longitude: sala.longitud
                  }}
                  title={sala.descripcion}
                  description={`Venta perdida: $${this.currency(
                    sala.venta_perdida
                  )}`}
                  style={{ zIndex: 1000 }}
                  onCalloutPress={() => {
                    Actions.salasInfo({ data: sala });
                  }}
                >
                  <Image
                    source={logo}
                    style={{ width: 40, height: 40, zIndex: -1 }}
                  />
                </MapView.Marker.Animated>
              );
            }

            return false;
          })}
        </MapView>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  region: state.salas.region,
  salas: state.salas.salas,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  GetLocationAsync,
  ListadoSalas
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maps);
