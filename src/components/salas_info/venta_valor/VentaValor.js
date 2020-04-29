import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StatusBar, SafeAreaView } from 'react-native';
import {
  Container,
  Button,
  Text,
  Content,
  Footer,
  FooterTab,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import DetalleVentaValor from '@components/salas_info/venta_valor/VentaValorActions';
import HeaderVentaValor from '@components/salas_info/venta_valor/header_venta_valor/HeaderVentaValor';
import CategoriasVentaValor from '@components/salas_info/venta_valor/categorias_venta_valor/CategoriasVentaValor';

class VentaValor extends React.Component {
  static propTypes = {
    DetalleVentaValor: PropTypes.func.isRequired,
    detalle: PropTypes.shape({
      mtb: PropTypes.number,
      mtbly: PropTypes.number,
      target: PropTypes.number,
      cumplimiento_number: PropTypes.number,
      cumplimiento_porc: PropTypes.number,
      cumplimientoly_number: PropTypes.number,
      cumplimientoly_porc: PropTypes.number,
    }),
    cod_local: PropTypes.string,
    cadena: PropTypes.string,
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    endpoint: PropTypes.string,
  };

  static defaultProps = {
    cod_local: '',
    cadena: '',
    nombreSala: '',
    direccion: '',
    detalle: {
      mtb: 0,
      mtbly: 0,
      target: 0,
      cumplimiento_number: 0,
      cumplimiento_porc: 0,
      cumplimientoly_number: 0,
      cumplimientoly_porc: 0,
    },
  };

  componentWillMount = () => {
    this.props.DetalleVentaValor(
      this.props.endpoint,
      this.props.cod_local,
      this.props.cadena
    );
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#F4F4F4' }}>
        <StatusBar barStyle="dark-content" />
        <Content
          style={{ flex: 1, backgroundColor: '#FFF' }}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf7c6' }}>
            <HeaderVentaValor
              nombreSala={this.props.nombreSala}
              direccion={this.props.direccion}
              data={this.props.detalle}
            />

            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
              }}
            >
              <CategoriasVentaValor
                data={this.props.detalle}
              />
            </View>
          </SafeAreaView>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              light
              onPress={() => {
                Actions.pop();
              }}
            >
              <Text>Cerrar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  detalle: state.ventaValor.detalle,
  endpoint: state.user.endpoint,
});

const mapDispatchToProps = {
  DetalleVentaValor,
};

export default connect(mapStateToProps, mapDispatchToProps)(VentaValor);
