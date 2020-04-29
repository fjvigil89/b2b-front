import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Text, ScrollView } from 'react-native';

import CategoriasVentaItem from '@components/salas_info/venta_valor/categorias_venta_valor/CategoriaVentaDetail';

class CategoriasVentaValor extends React.Component {
  static propTypes = {
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    data: PropTypes.shape({
      categorias: PropTypes.object,
      mtbly: PropTypes.number,
      target: PropTypes.number,
      cumplimiento_number: PropTypes.number,
      cumplimiento_porc: PropTypes.number,
      cumplimientoly_number: PropTypes.number,
      cumplimientoly_porc: PropTypes.number,
      ytb: PropTypes.number,
      ytbly: PropTypes.number,
      targetYear: PropTypes.number,
      cumplimiento_number_year: PropTypes.number,
      cumplimiento_porc_year: PropTypes.number,
      cumplimientoly_number_year: PropTypes.number,
      cumplimientoly_porc_year: PropTypes.number,
    }),
  };

  static defaultProps = {
    nombreSala: '',
    direccion: '',
    data: {
      mtb: 0,
      mtbly: 0,
      target: 0,
      cumplimiento_number: 0,
      cumplimiento_porc: 0,
      cumplimientoly_number: 0,
      cumplimientoly_porc: 0,
      ytb: 0,
      ytbly: 0,
      targetYear: 0,
      cumplimiento_number_year: 0,
      cumplimiento_porc_year: 0,
      cumplimientoly_number_year: 0,
      cumplimientoly_porc_year: 0,
    },
  };

  currency = (x) => {
    let parts = x.toString();
    parts = parts.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts;
  };

  formatter = (value) => {
    const formatterNumber = (x) => {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join('.');
    };

    if (value > 999999 && value < 1000000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} m`;
    } else if (value >= 1000000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} mm`;
    } else if (value < 1000000) {
      const format = formatterNumber(value);
      return `${format}`;
    }
    return value;
  };

  render() {
    const { data } = this.props
    const { categorias } = data

    let categoryDetail;
    if (data && categorias && Object.keys(categorias).length > 0) {
      categoryDetail = Object.entries(categorias).map((category) => {
        return (
          <CategoriasVentaItem
            key={category[0]}
            data={category}
          />
        );
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
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Bree',
                fontWeight: 'bold',
              }}
            >
              CATEGORIAS
            </Text>
          </View>
        </View>

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
            {categoryDetail}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CategoriasVentaValor;
