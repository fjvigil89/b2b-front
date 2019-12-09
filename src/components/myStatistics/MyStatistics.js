import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Container,
  Header,
  Left,
  Button,
  Title,
  Body,
  Text,
  Content,
} from "native-base";
import { Actions } from "react-native-router-flux";

import ReportePorTipo from "@components/report/ReportActions";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";
import LoginScreen from "@components/login/Login";
import LineChartExample from "@components/myStatistics/Chart";

import moment from "moment";
import "moment/locale/es";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

moment.locale("es");

class Report extends Component {
  static propTypes = {
    ReportePorTipo: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    endpoint: PropTypes.string,
    info: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    isAuthenticated: false,
    endpoint: "",
    info: []
  };

  constructor(props) {
    super(props);

    this.state = {
      btnToday: true,
      btnMonth: false,
      btnHistory: false,
      btnRoute: true,
      btnOwnStore: false,
      filterText: "",
      text: "",
      loading: false
    };
  }

  createTextDescription = () => {
    let text = "";
    let fechaInicio = "";
    let fechaTermino = "";

    if (this.state.hoyActive) {
      fechaInicio = this.props.info.fecha_periodo.actual;
      fechaTermino = this.props.info.fecha_periodo.anterior;

      text = `${fechaInicio} vs ${fechaTermino}`;

      return text;
    } else if (this.state.semanaActive) {
      fechaInicio = this.props.info.fecha_periodo.actual;
      fechaTermino = this.props.info.fecha_periodo.anterior;

      text = `Sem. ${fechaInicio} vs Sem. ${fechaTermino}`;

      return text;
    } else if (this.state.mesActive) {
      fechaInicio = moment(this.props.info.fecha_periodo.actual).format("MMMM");
      const fechaInicioNormalized =
        fechaInicio.charAt(0).toUpperCase() + fechaInicio.slice(1);

      fechaTermino = moment(this.props.info.fecha_periodo.anterior).format(
        "MMMM"
      );
      const fechaTerminoNormalized =
        fechaTermino.charAt(0).toUpperCase() + fechaTermino.slice(1);

      text = `${fechaInicioNormalized} a la fecha vs ${fechaTerminoNormalized} a la fecha`;

      return text;
    }

    return "";
  };

  formatter = value => {
    const formatterNumber = x => {
      const parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      return parts.join(".");
    };

    if (value > 999999 && value < 1000000000) {
      const format = formatterNumber(value).split(".");

      return `${format[0]}.${format[1].slice(0, 1)} m`;
    } else if (value >= 1000000000) {
      const format = formatterNumber(value).split(".");

      return `${format[0]}.${format[1].slice(0, 2)} mm`;
    } else if (value < 1000000) {
      const format = formatterNumber(value);

      return `${format}`;
    }

    return value;
  };

  _renderTitleSection = (title) => (
    <Text style={{
      textAlign: 'center',
      fontSize: 14,
      fontFamily: "Questrial",
      fontWeight: "bold"
      }}>
        {title}
      </Text>
  );

  _renderInfo = (title, value) => (
    <View style={{
      paddingTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 5
    }}>
      <Text style={{
        fontSize: 14,
        fontFamily: "Questrial",
      }}>{title}{value}</Text>
    </View>
  )

  render = () => {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    const info = [
      { title: 'Cantidad de fotos: ', value: 120 },
      { title: 'Cantidad de reposiciones: ', value: 250 },
      { title: 'Cantidad de casos gestionados: ', value: 120 },
      { title: 'Cumplimiento de ruta: ', value: '60%' },
      { title: 'Encuestas realizadas: ', value: '30%' },
      { title: 'Encuestas por Realizar: ', value: '70%' },
    ];

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <MaterialIcons
                name="menu"
                style={{
                  color: 'white',
                  fontSize: 25
                }}
              />
            </Button>
          </Left>
          <Body>
          <Title>Mis Estadisticas</Title>
          </Body>
        </Header>
        <Content
          scrollEnabled={false}
          style={styles.container}
          contentContainerStyle={styles.container}
        >
          <View style={{ height: 75 }}>
            <View
              style={styles.rowFilterByPeriod}
            >
                <Button
                  small
                  bordered={!this.state.btnToday}
                  transparent={this.state.btnToday}
                  style={styles.btnFilterByPeriod}
                  onPress={() => {
                    this.setState({
                      btnToday: true,
                      btnMonth: false,
                      btnHistory: false,
                    });
                  }}
                >
                  <Text>Día</Text>
                </Button>
                <Button
                  small
                  bordered={!this.state.btnMonth}
                  transparent={this.state.btnMonth}
                  style={styles.btnFilterByPeriod}
                  onPress={() => {
                    this.setState({
                      btnToday: false,
                      btnMonth: true,
                      btnHistory: false,
                    });
                  }}
                >
                  <Text>Mes</Text>
                </Button>
                <Button
                  small
                  bordered={!this.state.btnHistory}
                  transparent={this.state.btnHistory}
                  style={styles.btnFilterByPeriod}
                  onPress={() => {
                    this.setState({
                      btnToday: false,
                      btnMonth: false,
                      btnHistory: true,
                    });
                  }}
                >
                  <Text>Historico</Text>
                </Button>
            </View>
            <View
              style={styles.rowFilterByType}
            >
                <Button
                  small
                  bordered={!this.state.btnRoute}
                  transparent={this.state.btnRoute}
                  style={styles.btnFilterByPeriod}
                  onPress={() => {
                    this.setState({
                      btnRoute: true,
                      btnOwnStore: false,
                    });
                  }}
                >
                  <Text>Ruta</Text>
                </Button>
                <Button
                  small
                  bordered={!this.state.btnOwnStore}
                  transparent={this.state.btnOwnStore}
                  style={[styles.btnFilterByPeriod/* , this.state.btnRoute ? {} : '' */]}
                  onPress={() => {
                    this.setState({
                      btnRoute: false,
                      btnOwnStore: true,
                    });
                  }}
                >
                  <Text>Sala</Text>
                </Button>
            </View>
          </View>
          <View style={{ padding: 5 }}>
            {this._renderTitleSection('Evolución de casos gestionados')}
            <LineChartExample />
          </View>
          <View style={{ flex: 1 }}>
            {this._renderTitleSection('Información por filtro')}
            <FlatList
              data={info}
              renderItem={({ item }) => this._renderInfo(item.title, item.value)}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>

          {this.state.loading && <LoadingOverlay />}
        </Content>
      </Container>
    );
  };
}

const styles = StyleSheet.create({
  rowFilterByPeriod: {
    flex: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  rowFilterByType: {
    flex: 200,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 10,
  },
  btnFilterByPeriod: {
    flex: 0.32,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: {
    borderBottomWidth: 0
  },
})

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  info: state.reporte.info,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  ReportePorTipo
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
