import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
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

import DetalleMedicion from '@components/salas_info/medicionCadem/MedicionCademActions';

import ListadoProductosCademsmart from '@components/salas_info/productos_cademsmart/ProductosCademsmartActions';
import HeaderCademsmart from '@components/salas_info/medicionCadem/header/HeaderMedicionCadem';
import IndicadoresMedicionCadem from '@components/salas_info/medicionCadem/indicadores/IndicadoresMedicionCadem';

import ProductoCademsmart from '@components/salas_info/productos_cademsmart/producto_cademsmart/ProductoCademsmart';

class MedicionCadem extends React.Component {
  static propTypes = {
    DetalleMedicion: PropTypes.func.isRequired,
    ListadoProductosCademsmart: PropTypes.func.isRequired,
    productos: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    porcentaje: PropTypes.string,
    visita: PropTypes.number,
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    ultimaMedicion: PropTypes.string,
    endpoint: PropTypes.string,
  };

  static defaultProps = {
    porcentaje: '',
    visita: 0,
    nombreSala: '',
    direccion: '',
    ultimaMedicion: '',
    endpoint: '',
  };

  componentWillMount = () => {
    this.props.DetalleMedicion(this.props.folio);
  };

  render() {
    const mediciones = [
      {
        nombre: 'CARTELERIA',
        nota_medicion: 44.9,
        variacion: 12.9,
        ultimas_mediciones: [10, 100, 20, 80, 60],
      },
      {
        nombre: 'OSA',
        nota_medicion: 100.0,
        variacion: -9.2,
        ultimas_mediciones: [50, 60, 70, 80, 90],
      },
    ];
    return (
      <Container style={{ backgroundColor: '#F4F4F4' }}>
        <StatusBar barStyle="dark-content" />
        <Content
          style={{ flex: 1, backgroundColor: '#FFF' }}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf7c6' }}>
            <HeaderCademsmart
              porcentaje={this.props.porcentaje}
              nombreSala={this.props.nombreSala}
              direccion={this.props.direccion}
              ultimaMedicion={this.props.ultimaMedicion}
            />

            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
              }}
            >
              <ScrollView>
                <IndicadoresMedicionCadem data={mediciones} />
              </ScrollView>
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
  productos: state.productosCademsmart.productos,
});

const mapDispatchToProps = {
  DetalleMedicion,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicionCadem);
