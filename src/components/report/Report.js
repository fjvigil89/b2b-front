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

class Report extends Component {
  static propTypes = {
    ReportePorTipo: PropTypes.func.isRequired,
    endpoint: PropTypes.string,
    info: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    endpoint: "",
    info: []
  };

  constructor(props) {
    super(props);

    this.state = {
      hoyActive: true,
      semanaActive: false,
      mesActive: false,
      isLoading: true
    };
  }

  componentWillMount = () => {
    this.refreshReport("day");
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

    if (isLoading) {
      return <LoadingOverlay />;
    }

    const { info } = this.props;

    const listReport = info.banderas.map(data => (
      <DetailReport data={data} key={data.nombre} />
    ));

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Reporte</Title>
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
          <View style={{ height: 180 }}>
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
                  <Text>Hoy</Text>
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
                  <Text>Hoy</Text>
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
                flex: 650,
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
                  borderColor: "green",
                  borderWidth: 2,
                  height: 100
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
                    name="md-trophy"
                    style={{
                      fontSize: 50,
                      color: "green"
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Questrial",
                      color: "green"
                    }}
                  >
                    {this.formatter(info.total_ventas)}
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 12
                    }}
                  >
                    Total de Ventas
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
                  borderColor: "red",
                  borderWidth: 2,
                  height: 100
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
                    name="md-stats"
                    style={{
                      fontSize: 50,
                      color: "red"
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Questrial",
                      color: "red"
                    }}
                  >
                    {this.formatter(info.venta_perdida)}
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 12
                    }}
                  >
                    Venta Perdida
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 150,
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
  info: state.reporte.info,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  ReportePorTipo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
