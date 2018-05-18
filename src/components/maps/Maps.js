import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import GetRegionMaps from "@components/maps/MapsAction";
import { ListadoSalas } from "@components/salas/salas_list/SalasListActions";

class Maps extends Component {
  static propTypes = {
    GetRegionMaps: PropTypes.func.isRequired,
    ListadoSalas: PropTypes.func.isRequired,
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
    )
  };

  static defaultProps = {
    region: {},
    salas: []
  };

  componentWillMount = () => {
    this.props.GetRegionMaps();
    this.props.ListadoSalas();
  };

  render = () => {
    const { salas, region } = this.props;
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
        <MapView
          style={{ flex: 1 }}
          region={region}
          // onRegionChange={this.onRegionChange}
        >
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
                  key={sala.cod_local}
                  coordinate={{
                    latitude: parseFloat(sala.latitud),
                    longitude: parseFloat(sala.longitud)
                  }}
                  title={sala.bandera}
                  description={sala.descripcion}
                  image={logo}
                />
              );
            }
          })}
        </MapView>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  region: state.maps.region,
  salas: state.salas.salas
});

const mapDispatchToProps = {
  GetRegionMaps,
  ListadoSalas
};

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
