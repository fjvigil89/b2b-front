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
    porcentaje: PropTypes.string,
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    endpoint: PropTypes.string,
    indicadores: PropTypes.array,
  };

  static defaultProps = {
    porcentaje: '',
    nombreSala: '',
    direccion: '',
    endpoint: '',
    indicadores: [],
  };

  componentWillMount = () => {
    this.props.DetalleMedicion(this.props.endpoint, this.props.folio);
  };

  render() {
    const { indicadores } = this.props;
    return (
      <Container style={{ backgroundColor: '#F4F4F4' }}>
        <StatusBar barStyle="dark-content" />
        <Content
          style={{ flex: 1, backgroundColor: '#FFF' }}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <SafeAreaView
            style={{ flex: 1, backgroundColor: '#fdf7c6', paddingTop: 10 }}
          >
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
                <IndicadoresMedicionCadem data={indicadores} />
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
  indicadores: state.medicion.indicadores,
  endpoint: state.user.endpoint,
});

const mapDispatchToProps = {
  DetalleMedicion,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicionCadem);
