import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@assets/native-base-theme/variables//commonColor';
import { VictoryBar, VictoryLabel } from 'victory-native';

const IconsMedicion = {
  Cartel: require('@assets/images/iconos-medicion/Cartel.png'),
  Catalogo: require('@assets/images/iconos-medicion/Catalogo.png'),
  Facing: require('@assets/images/iconos-medicion/Facing.png'),
  Fleje: require('@assets/images/iconos-medicion/Fleje.png'),
  Osa: require('@assets/images/iconos-medicion/Osa.png'),
  Sovi: require('@assets/images/iconos-medicion/Sovi.png'),
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
    if (parseFloat(num) > 0) {
      return (
        <Text
          style={{
            fontSize: 15,
            color: 'green',
          }}
        >
          + {num * 100}
        </Text>
      );
    } else if (parseFloat(num) === 0) {
      return (
        <Text
          style={{
            fontSize: 15,
            color: 'green',
          }}
        >
          {num * 100}
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
          - {Math.abs(num * 100)}
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
        : `${(score * 100).toFixed(2)} %`;
    const ultimosIndicadores = lastIndicators.map((i) => i * 100);

    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomColor: '#DEDEDE',
            borderBottomWidth: 1,
          },
          inScore
            ? { borderLeftColor: Colors.brandPrimary, borderLeftWidth: 6 }
            : {},
        ]}
      >
        <View
          style={{
            flex: 0.26,
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
              {name}
            </Text>
          </View>
          <View
            style={{
              flex: 0.7,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingTop: 2,
            }}
          >
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,

                elevation: 7,
              }}
            >
              {name && this.icono(name)}
            </View>
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
              paddingTop: 15,
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
              alignItems: 'flex-end',
            }}
          >
            {this.semaforo(diff)}
          </View>
        </View>
        <View
          style={{
            flex: 0.34,
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
            {ultimosIndicadores.length > 0 && (
              <VictoryBar
                width={120}
                height={70}
                data={ultimosIndicadores.concat(100)}
                barWidth={17}
                barRatio={1}
                alignment="start"
                style={{
                  data: { fill: Colors.brandInfo },
                  labels: { fill: '#999' },
                }}
                padding={{ top: 25, bottom: 0, left: 0, right: 0 }}
                samples={100}
                labels={({ datum }) => datum._y}
                labelComponent={<VictoryLabel dx={9} dy={-10} />}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default IndicadoresMedicionDetail;
