import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Content,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  List
} from "native-base";
import PollsListGrid from "@components/polls/polls_list/polls_list_grid/PollsListGrid";

class PollsList extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount = () => {};

  render = () => {
    const maps = [
      {
        id: 1,
        name: "Encuesta 1",
        description: "Descripcion de encuesta 1.. Descripcion de encuesta 1 ",
        vigencia: "23/09/2018",
        salas: [
          {
            idPolls: 34,
            state: "complete",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          }
        ]
      },
      {
        id: 2,
        name: "Encuesta 2",
        description: "Descripcion de encuesta 2.. Descripcion de encuesta 2 ",
        vigencia: "23/09/2018",
        salas: [
          {
            idPolls: 34,
            state: "available",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          }
        ]
      },
      {
        id: 3,
        name: "Encuesta 3",
        description: "Descripcion de encuesta 3.. Descripcion de encuesta 3 ",
        vigencia: "23/09/2018",
        salas: [
          {
            idPolls: 34,
            state: "notAvailable",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          },
          {
            idPolls: 34,
            state: "available",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          },
          {
            idPolls: 34,
            state: "complete",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          },
          {
            idPolls: 34,
            state: "expired",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          }
        ]
      },
      {
        id: 4,
        name: "Encuesta 4",
        description: "Descripcion de encuesta 4.. Descripcion de encuesta 3 ",
        vigencia: "23/09/2018",
        salas: [
          {
            idPolls: 34,
            state: "notAvailable",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          },
          {
            idPolls: 34,
            state: "available",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          },
          {
            idPolls: 34,
            state: "complete",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          },
          {
            idPolls: 34,
            state: "expired",
            bandera: "JUMBO",
            cadena: "CENCOSUD",
            cod_local: "J511",
            date_b2b: "2018-07-22",
            descripcion: "JUMBO - PROVIDENCIA, COSTANERA CENTER",
            direccion: "AV. ANDRES BELLO #2465",
            fecha_visita: "2018-07-23 00:00:00.000",
            folio: 41065015,
            kilometers: 5.4,
            latitud: -33.4174979,
            longitud: -70.6080864,
            mide: 1,
            osa: 71,
            prefijoKilometers: "Km",
            realizada: 1,
            venta_perdida: 4885565
          }
        ]
      }
    ];
    const list = maps.map(data => <PollsListGrid key={data.id} data={data} />);

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Encuestas</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>{list}</List>
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollsList);
