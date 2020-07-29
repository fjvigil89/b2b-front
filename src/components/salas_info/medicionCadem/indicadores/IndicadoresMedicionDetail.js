import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@assets/native-base-theme/variables//commonColor';
import {
  VictoryBar,
  VictoryLabel,
  VictoryChart,
  VictoryContainer,
} from 'victory-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  indicatorTypeContent: {
    flex: 0.33,
    flexDirection: 'column',
  },
  indicatorName: {
    flex: 1,
    alignItems: 'center',
  },
  txtName: {
    fontSize: 15,
    fontFamily: 'Questrial',
    color: '#555',
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 2,
  },
  iconContent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  chartContainer: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  chartContent: {
    justifyContent: 'center',
  },
  diff: {
    flex: 1,
    alignItems: 'center',
  },
});
const IconsMedicion = {
  Cartel: require('@assets/images/iconos-medicion/Cartel.png'),
  Catalogo: require('@assets/images/iconos-medicion/Catalogo.png'),
  Facing: require('@assets/images/iconos-medicion/Facing.png'),
  Fleje: require('@assets/images/iconos-medicion/Fleje.png'),
  Osa: require('@assets/images/iconos-medicion/Osa.png'),
  Sovi: require('@assets/images/iconos-medicion/Sovi.png'),
  $Destacado: require('@assets/images/iconos-medicion/Precio-Destacado.png'),
  Nsg: require('@assets/images/iconos-medicion/Nsg.png'),
};

class IndicadoresMedicionDetail extends React.Component {
  static propTypes = {
    diff: PropTypes.number,
    inScore: PropTypes.bool,
    lastIndicators: PropTypes.array,
    name: PropTypes.string,
    score: PropTypes.number,
  };

  static defaultProps = {
    diff: 0,
    inScore: false,
    lastIndicators: [],
    name: '',
    score: 0,
  };

  semaforo = (num) => {
    const roundedNumber = (Math.ceil(num * 1000) / 1000) * 100;
    const parseNumber = roundedNumber.toFixed(1);
    if (parseFloat(num) > 0) {
      return (
        <Text
          style={{
            fontSize: 15,
            color: 'green',
            textAlign: 'auto',
            flex: 1,
            marginRight: 20,
          }}
        >
          + {parseNumber}
        </Text>
      );
    } else if (parseFloat(num) === 0) {
      return (
        <Text
          style={{
            fontSize: 15,
            color: 'green',
            textAlign: 'auto',
            flex: 1,
            marginRight: 20,
          }}
        >
          {parseNumber}
        </Text>
      );
    } else if (parseFloat(num) < 0) {
      return (
        <Text
          style={{
            fontSize: 15,
            color: 'red',
            textAlign: 'auto',
            flex: 1,
            marginRight: 20,
          }}
        >
          - {Math.abs(parseNumber)}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontSize: 15,
          }}
        >
          -
        </Text>
      );
    }
  };

  icono = (medicion) => {
    if (!IconsMedicion[medicion]) {
      return (
        <Image
          style={{ height: 55, width: 55 }}
          source={require('@assets/images/iconos-medicion/default.png')}
        />
      );
    }
    return (
      <Image
        style={{ height: 55, width: 55 }}
        source={IconsMedicion[medicion]}
      />
    );
  };

  render() {
    const { diff, inScore, lastIndicators, name, score } = this.props.medicion;
    const nota =
      score * 100 === 100 || score * 100 === 0
        ? `${score * 100} %`
        : `${(score * 100).toFixed(1)} %`;
    const ultimosIndicadores = lastIndicators.map((i) => parseInt(i * 100));

    return (
      <View
        style={[
          styles.container,
          inScore
            ? { borderLeftColor: Colors.brandPrimary, borderLeftWidth: 6 }
            : {},
        ]}
      >
        <View style={styles.indicatorTypeContent}>
          <View style={styles.indicatorName}>
            <Text style={styles.txtName}>{name}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.iconContent}>{name && this.icono(name)}</View>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chartContent}>
            {ultimosIndicadores.length > 0 && (
              <VictoryBar
                width={width * 0.3}
                height={80}
                data={ultimosIndicadores.reverse()}
                maxDomain={{ y: 100 }}
                barWidth={15}
                barRatio={1}
                alignment="start"
                style={{
                  data: {
                    fill: Colors.brandInfo,
                  },
                  labels: {
                    fill: '#999',
                  },
                }}
                padding={{ top: 25, bottom: 0, left: 20, right: 20 }}
                samples={100}
                labels={({ datum }) => datum._y}
                labelComponent={<VictoryLabel dx={7} dy={-9} />}
              />
            )}
          </View>
        </View>
        <View
          style={{
            flex: 0.34,
            paddingTop: 15,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Bree',
              fontWeight: 'bold',
              textAlign: 'center',
              color: Colors.brandPrimary,
            }}
          >
            {nota}
          </Text>
          {this.semaforo(diff)}
        </View>
      </View>
    );
  }
}

export default IndicadoresMedicionDetail;
