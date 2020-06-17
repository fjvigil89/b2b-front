import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import IndicadoresMedicionDetail from '@components/salas_info/medicionCadem/indicadores/IndicadoresMedicionDetail';

class CategoriasVentaValor extends React.Component {
  static propTypes = {
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    data: PropTypes.shape({
      nombre: PropTypes.string,
      nota_medicion: PropTypes.number,
      variacion: PropTypes.number,
      ultimas_mediciones: PropTypes.array,
    }),
  };

  static defaultProps = {
    nombreSala: '',
    direccion: '',
    data: {
      nombre: '',
      nota_medicion: 0,
      variacion: 0,
      ultimas_mediciones: [],
    },
  };

  render() {
    const { data } = this.props;

    let indicadoresDetail;
    if (data && data.length > 0) {
      indicadoresDetail = data.map((medicion) => {
        return <IndicadoresMedicionDetail medicion={medicion} />;
      });
    }
    /* indicadoresDetail = (
      <View>
        <IndicadoresMedicionDetail />
      </View>
    ); */

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: '#FFF',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
          }}
        >
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            {indicadoresDetail}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CategoriasVentaValor;
