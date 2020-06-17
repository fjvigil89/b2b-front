import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@assets/native-base-theme/variables//commonColor';
import { VictoryBar, VictoryChart } from 'victory-native';

class IndicadoresMedicionDetail extends React.Component {
  static propTypes = {
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    data: PropTypes.array,
  };

  static defaultProps = {
    nombreSala: '',
    direccion: '',
    data: [],
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
    if (value >= 1000 && value < 1000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} k`;
    } else if (value >= 1000000 && value < 1000000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} m`;
    } else if (value >= 1000000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} mm`;
    } else if (value <= -1000 && value > -1000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} k`;
    } else if (value <= -1000000 && value > -1000000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} m`;
    } else if (value <= -1000000000) {
      const format = formatterNumber(value).split('.');
      return `${format[0]}.${format[1].slice(0, 2)} mm`;
    }
    return value;
  };

  semaforo = (num) => {
    if (parseFloat(num) >= 0) {
      return (
        <Text
          style={{
            fontSize: 15,
            color: 'green',
          }}
        >
          + {num}
        </Text>
      );
    } else if (parseFloat(num) < 0) {
      return (
        <Text
          style={{
            fontSize: 15,
            color: 'red',
          }}
        >
          - {Math.abs(num)}
        </Text>
      );
    } else {
      return <></>;
    }
  };

  icono = (medicion) => {
    switch (medicion) {
      case 'OSA':
        return (
          <Ionicons
            style={{
              fontSize: 50,
            }}
            name="md-analytics"
          />
        );
      case 'CARTELERIA':
        return (
          <Ionicons
            style={{
              fontSize: 50,
            }}
            name="ios-grid"
          />
        );
      default:
        return (
          <Ionicons
            style={{
              fontSize: 50,
            }}
            name="md-apps"
          />
        );
    }
  };

  render() {
    const {
      nombre,
      nota_medicion,
      variacion,
      ultimas_mediciones,
    } = this.props.medicion;

    const nota = `${nota_medicion} %`;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderBottomColor: '#DEDEDE',
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flex: 0.25,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Questrial',
                color: '#555',
              }}
            >
              {nombre}
            </Text>
          </View>
          <View
            style={{
              flex: 0.7,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {this.icono(nombre)}
            {/* <Ionicons
              style={{
                fontSize: 50,
              }}
              name="md-apps"
            /> */}
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                color: Colors.brandPrimary,
              }}
            >
              {nota}
            </Text>
          </View>
          <View
            style={{
              flex: 0.7,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {this.semaforo(variacion)}
          </View>
        </View>
        <View
          style={{
            flex: 0.35,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <VictoryBar
              width={120}
              height={65}
              data={ultimas_mediciones.concat(0)}
              barWidth={17}
              barRatio={1}
              alignment="start"
              style={{ data: { fill: Colors.brandInfo } }}
              animate={{
                duration: 2500,
                onLoad: { duration: 1500 },
              }}
              padding={0}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default IndicadoresMedicionDetail;
