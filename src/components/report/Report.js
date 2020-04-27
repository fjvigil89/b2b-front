import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
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
  Content,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import ReportePorTipo from '@components/report/ReportActions';
import LoadingOverlay from '@common/loading_overlay/LoadingOverlay';
import DetailReport from '@components/report/detail_report/DetailReport';
import LoginScreen from '@components/login/Login';

import moment from 'moment';
import 'moment/locale/es';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

moment.locale('es');

class Report extends Component {
  static propTypes = {
    ReportePorTipo: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    endpoint: PropTypes.string,
    info: PropTypes.oneOfType([PropTypes.any]),
  };

  static defaultProps = {
    isAuthenticated: false,
    endpoint: '',
    info: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      hoyActive: false,
      semanaActive: true,
      mesActive: false,
      filterText: '',
      text: '',
      loading: false,
    };
  }

  componentWillMount = () => {
    this.refreshReport('week', 'Semana');
  };

  createTextDescription = () => {
    let text = '';
    let fechaInicio = '';
    let fechaTermino = '';

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
      fechaInicio = moment(this.props.info.fecha_periodo.actual).format('MMMM');
      const fechaInicioNormalized =
        fechaInicio.charAt(0).toUpperCase() + fechaInicio.slice(1);

      fechaTermino = moment(this.props.info.fecha_periodo.anterior).format(
        'MMMM'
      );
      const fechaTerminoNormalized =
        fechaTermino.charAt(0).toUpperCase() + fechaTermino.slice(1);

      text = `${fechaInicioNormalized} a la fecha vs ${fechaTerminoNormalized} a la fecha`;

      return text;
    }

    return '';
  };

  refreshReport = (type, text) => {
    this.setState({
      loading: true,
    });

    this.props
      .ReportePorTipo(this.props.endpoint, type)
      .then(() => {
        this.setState({
          loading: false,
          filterText: text,
          text: this.createTextDescription(),
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  formatter = (value) => {
    const formatterNumber = (x) => {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      return parts.join('.');
    };

    if (value > 999999 && value < 1000000000) {
      const format = formatterNumber(value).split('.');

      return `${format[0]}.${format[1].slice(0, 1)} m`;
    } else if (value >= 1000000000) {
      const format = formatterNumber(value).split('.');

      return `${format[0]}.${format[1].slice(0, 2)} mm`;
    } else if (value < 1000000) {
      const format = formatterNumber(value);

      return `${format}`;
    }

    return value;
  };

  render = () => {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    const { info } = this.props;

    const listReport = info.banderas.map((data) => {
      const colorVentas =
        // "#083D77";
        // TODO: COLORS
        parseFloat(data.ventas.variacion.replace('%', '')) < 0
          ? 'red'
          : 'green';

      const iconoVentas =
        parseFloat(data.ventas.variacion.replace('%', '')) < 0
          ? 'dislike'
          : 'like';

      const colorVentasPerdidas =
        // "gray";
        // TODO: colors
        parseFloat(data.ventas_perdidas.variacion.replace('%', '')) < 0
          ? 'green'
          : 'red';

      const iconoVentasPerdidas =
        parseFloat(data.ventas_perdidas.variacion.replace('%', '')) < 0
          ? 'like'
          : 'dislike';

      return (
        <DetailReport
          data={data}
          key={data.nombre}
          colorVentas={colorVentas}
          iconoVentas={iconoVentas}
          colorVentasPerdidas={colorVentasPerdidas}
          iconoVentasPerdidas={iconoVentasPerdidas}
        />
      );
    });

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <MaterialIcons
                name="menu"
                style={{
                  color: 'white',
                  fontSize: 25,
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                Actions.HelpReport();
              }}
            >
              <Ionicons
                name="ios-help-circle"
                style={{
                  color: 'white',
                  fontSize: 25,
                }}
              />
            </Button>
          </Right>
        </Header>
        <Content
          scrollEnabled={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <View style={{ height: 255 }}>
            <View
              style={{
                flex: 200,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: '#FFF',
              }}
            >
              {/* {this.state.hoyActive ? (
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
                    this.refreshReport("day", "Día");

                    this.setState({
                      hoyActive: true,
                      semanaActive: false,
                      mesActive: false
                    });
                  }}
                >
                  <Text>Día</Text>
                </Button>
              )} */}

              {this.state.semanaActive ? (
                <Button
                  small
                  bordered
                  style={{ flex: 0.5, justifyContent: 'center' }}
                >
                  <Text>Semana</Text>
                </Button>
              ) : (
                <Button
                  small
                  transparent
                  style={{ flex: 0.5, justifyContent: 'center' }}
                  onPress={() => {
                    this.refreshReport('week', 'Semana');

                    this.setState({
                      hoyActive: false,
                      semanaActive: true,
                      mesActive: false,
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
                  style={{ flex: 0.5, justifyContent: 'center' }}
                >
                  <Text>Mes</Text>
                </Button>
              ) : (
                <Button
                  small
                  transparent
                  style={{ flex: 0.5, justifyContent: 'center' }}
                  onPress={() => {
                    this.refreshReport('month', 'Mes');

                    this.setState({
                      hoyActive: false,
                      semanaActive: false,
                      mesActive: true,
                    });
                  }}
                >
                  <Text>Mes</Text>
                </Button>
              )}
            </View>

            <View
              style={{
                flex: 560,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
                paddingTop: 0,
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  margin: 10,
                  marginTop: 0,
                  borderRadius: 5,
                  borderColor: '#083D77',
                  borderWidth: 2,
                  height: 130,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    name="logo-usd"
                    style={{
                      fontSize: 50,
                      color: '#083D77',
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      fontFamily: 'Questrial',
                      color: '#083D77',
                    }}
                  >
                    {this.formatter(info.total_ventas)}
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: 'Questrial',
                      fontSize: 12,
                      color: '#083D77',
                    }}
                  >
                    Total de Ventas
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: 'Questrial',
                      fontSize: 12,
                      color: '#083D77',
                    }}
                  >
                    {this.formatter(info.venta_unidades)} unidades vendidas
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  margin: 10,
                  marginTop: 0,
                  borderRadius: 5,
                  borderColor: '#083D77',
                  borderWidth: 2,
                  height: 130,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    name="ios-search"
                    style={{
                      fontSize: 50,
                      color: 'gray',
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      fontFamily: 'Questrial',
                      color: 'gray',
                    }}
                  >
                    {this.formatter(info.venta_perdida)}
                  </Text>

                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: 'Questrial',
                      fontSize: 12,
                      color: 'gray',
                    }}
                  >
                    Venta Perdida
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: 'Questrial',
                      fontSize: 12,
                      color: '#083D77',
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 120,
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingTop: 5,
                  backgroundColor: '#FFF',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Bree',
                    fontWeight: 'bold',
                    marginBottom: 0,
                  }}
                >
                  Detalle de Reporte
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 120,
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomColor: '#DEDEDE',
                  borderBottomWidth: 1,
                  paddingTop: 5,
                  paddingBottom: 10,
                  backgroundColor: '#FFF',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Questrial',
                    marginBottom: 0,
                  }}
                >
                  {this.state.filterText}: {this.state.text}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <ScrollView>{listReport}</ScrollView>
          </View>

          {this.state.loading && <LoadingOverlay />}
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  info: state.reporte.info,
  endpoint: state.user.endpoint,
});

const mapDispatchToProps = {
  ReportePorTipo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
