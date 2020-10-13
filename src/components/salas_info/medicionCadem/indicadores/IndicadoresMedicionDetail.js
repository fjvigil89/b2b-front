import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
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

  constructor(props) {
    super(props);

    this.state = {
      aditionalPanelCatalogo: false,
      aditionalPanelOsa: false,
    };
  }

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

    let infoCatalogos;
    let infoOSA;
    let detailCatalogo = <View key="infoCatalogo0"></View>;
    let detailOsa = <View key="infoOsa0"></View>;

    if (name === 'Osa') {
      infoOSA = this.props.medicion.detail;

      if (infoOSA.productos && infoOSA.productos.length > 0) {
        let contadorOsa = 0;
        detailOsa = infoOSA.productos.map((det) => (
          <View
            key={'infoOsa' + ++contadorOsa}
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 3,
            }}
          >
            <View
              style={{
                flex: 0.3,
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                }}
              >
                {det.categoria}
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                {det.ean}
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                }}
              >
                {det.descripcion}
              </Text>
            </View>
          </View>
        ));
      }
    } else if (name === 'Catalogo') {
      infoCatalogos = this.props.medicion.detail;

      if (infoCatalogos.productos && infoCatalogos.productos.length > 0) {
        let contadorCatalogo = 0;
        detailCatalogo = infoCatalogos.productos.map((det) => (
          <View
            key={'infoCatalogo' + ++contadorCatalogo}
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 3,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                }}
              >
                {det.descripcion}
              </Text>
            </View>
          </View>
        ));
      }
    }

    return (
      <View
        style={[
          styles.container,
          inScore
            ? { borderLeftColor: Colors.brandPrimary, borderLeftWidth: 6 }
            : {},
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingRight: 0,
            marginRight: 0,
            height: 80,
          }}
          onPress={() => {
            if (name === 'Osa') {
              this.setState({
                aditionalPanelOsa: !this.state.aditionalPanelOsa,
              });
            } else if (name === 'Catalogo') {
              this.setState({
                aditionalPanelCatalogo: !this.state.aditionalPanelCatalogo,
              });
            }
          }}
        >
          <View style={{ flex: 0.33, flexDirection: 'column' }}>
            <View style={styles.indicatorName}>
              <Text style={styles.txtName}>{name}</Text>
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.iconContent}>{name && this.icono(name)}</View>
            </View>
          </View>
          <View
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
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
        </TouchableOpacity>

        {this.state.aditionalPanelOsa && (
          <View
            style={{
              flex: 1,
              marginTop: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: 'Questrial',
                }}
              >
                Fecha de auditoria: {infoOSA.fechaAuditoria}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: 'Questrial',
                }}
              >
                Productos no encontrados: {infoOSA.productosNoEncontrados} de{' '}
                {infoOSA.productosTotal}
              </Text>
            </View>

            {parseInt(infoOSA.productosNoEncontrados) !== 0 && (
              <View
                style={{
                  flex: 1,
                  width: width - 40,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#DAE0F0',
                    padding: 3,
                  }}
                >
                  <View
                    style={{
                      flex: 0.3,
                      flexDirection: 'column',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                      }}
                    >
                      Categoría
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      flexDirection: 'column',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                      }}
                    >
                      EAN
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'column',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                      }}
                    >
                      Descripción item
                    </Text>
                  </View>
                </View>
                {detailOsa}
              </View>
            )}
          </View>
        )}

        {this.state.aditionalPanelCatalogo && (
          <View
            style={{
              flex: 1,
              marginTop: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: 'Questrial',
                }}
              >
                Fecha de auditoria: {infoCatalogos.fechaAuditoria}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 11,
                  fontWeight: 'bold',
                  fontFamily: 'Questrial',
                }}
              >
                Catalogos no encontrados: {infoCatalogos.productosNoEncontrados}{' '}
                de {infoCatalogos.productosTotal}
              </Text>
            </View>
            {parseInt(infoCatalogos.productosNoEncontrados) !== 0 && (
              <View
                style={{
                  flex: 1,
                  width: width - 40,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#DAE0F0',
                    padding: 3,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                      }}
                    >
                      Descripción de promoción
                    </Text>
                  </View>
                </View>
                {detailCatalogo}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default IndicadoresMedicionDetail;
