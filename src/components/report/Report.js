import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ScrollView, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body,
  Text,
  Content
} from "native-base";
import { Actions } from "react-native-router-flux";

import ReportePorTipo from "@components/report/ReportActions";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";
import DetailReport from "@components/report/detail_report/DetailReport";
import LoginScreen from "@components/login/Login";

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
      hoyActive: false,
      semanaActive: true,
      mesActive: false,
      isLoading: true
    };
  }

  componentWillMount = () => {
    this.refreshReport("week");
  };

  refreshReport = type => {
    this.setState({
      isLoading: true
    });

    this.props.ReportePorTipo(this.props.endpoint, type).then(() => {
      this.setState({
        isLoading: false
      });
    });
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

  render = () => {
    const { isLoading } = this.state;
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    if (isLoading) {
      return <LoadingOverlay />;
    }

    const { info } = this.props;

    const listReport = info.banderas.map(data => {
      const colorVentas =
        parseFloat(data.ventas.variacion.replace("%", "")) < 0
          ? "red"
          : "green";

      const colorVentasPerdidas =
        parseFloat(data.ventas_perdidas.variacion.replace("%", "")) < 0
          ? "green"
          : "red";

      return (
        <DetailReport
          data={data}
          key={data.nombre}
          colorVentas={colorVentas}
          colorVentasPerdidas={colorVentasPerdidas}
        />
      );
    });

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Content
          scrollEnabled={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flex: 1
          }}
        >
          <View style={{ height: 210 }}>
            <View
              style={{
                flex: 200,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                backgroundColor: "#FFF"
              }}
            >
              {this.state.hoyActive ? (
                <Button
                  small
                  bordered
                  style={{ flex: 0.33, justifyContent: "center" }}
                >
                  <Text>Día</Text>
                </Button>
              ) : (
                <Button
                  small
                  transparent
                  style={{ flex: 0.33, justifyContent: "center" }}
                  onPress={() => {
                    this.refreshReport("day");

                    this.setState({
                      hoyActive: true,
                      semanaActive: false,
                      mesActive: false
                    });
                  }}
                >
                  <Text>Día</Text>
                </Button>
              )}

              {this.state.semanaActive ? (
                <Button
                  small
                  bordered
                  style={{ flex: 0.33, justifyContent: "center" }}
                >
                  <Text>Semana</Text>
                </Button>
              ) : (
                <Button
                  small
                  transparent
                  style={{ flex: 0.33, justifyContent: "center" }}
                  onPress={() => {
                    this.refreshReport("week");

                    this.setState({
                      hoyActive: false,
                      semanaActive: true,
                      mesActive: false
                    });
                  }}
                >
                  <Text>Semana</Text>
                </Button>
              )}

              {this.state.mesActive ? (
                <Button
                  small
                  bordered
                  style={{ flex: 0.33, justifyContent: "center" }}
                >
                  <Text>Mes</Text>
                </Button>
              ) : (
                <Button
                  small
                  transparent
                  style={{ flex: 0.33, justifyContent: "center" }}
                  onPress={() => {
                    this.refreshReport("month");

                    this.setState({
                      hoyActive: false,
                      semanaActive: false,
                      mesActive: true
                    });
                  }}
                >
                  <Text>Mes</Text>
                </Button>
              )}
            </View>

            <View
              style={{
                flex: 680,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#FFF",
                paddingTop: 0,
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  margin: 10,
                  marginTop: 0,
                  borderRadius: 5,
                  borderColor: "#083D77",
                  borderWidth: 2,
                  height: 130
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="logo-usd"
                    style={{
                      fontSize: 50,
                      color: "#083D77"
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Questrial",
                      color: "#083D77"
                    }}
                  >
                    {this.formatter(info.total_ventas)}
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 12,
                      color: "#083D77"
                    }}
                  >
                    Total de Ventas
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 12,
                      color: "#083D77"
                    }}
                  >
                    {this.formatter(info.venta_unidades)} unidades vendidas
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  margin: 10,
                  marginTop: 0,
                  borderRadius: 5,
                  borderColor: "#083D77",
                  borderWidth: 2,
                  height: 130
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="ios-search"
                    style={{
                      fontSize: 50,
                      color: "#083D77"
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Questrial",
                      color: "#083D77"
                    }}
                  >
                    {this.formatter(info.venta_perdida)}
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 12,
                      color: "#083D77"
                    }}
                  >
                    Venta Perdida
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 12,
                      color: "#083D77"
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 120,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottomColor: "#DEDEDE",
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                  paddingTop: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Bree",
                    fontWeight: "bold",
                    marginBottom: 0
                  }}
                >
                  Detalle de Reporte
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <ScrollView>{listReport}</ScrollView>
          </View>
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  info: state.reporte.info,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  ReportePorTipo
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
