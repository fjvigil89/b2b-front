import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import IndicadoresMedicionDetail from '@components/salas_info/medicionCadem/indicadores/IndicadoresMedicionDetail';

class IndicadoresMedicionCadem extends React.Component {
  static propTypes = {
    data: PropTypes.array,
  };

  static defaultProps = {
    data: [],
  };

  render() {
    const { data } = this.props;

    let indicadoresDetail;
    if (data && data.length > 0) {
      indicadoresDetail = data.map((medicion, index) => {
        return <IndicadoresMedicionDetail key={index} medicion={medicion} />;
      });
    }

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

export default IndicadoresMedicionCadem;
