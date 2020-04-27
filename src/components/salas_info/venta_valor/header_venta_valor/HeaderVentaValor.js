import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text } from 'react-native';

class HeaderVentaValor extends React.Component {
  static propTypes = {
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    data: PropTypes.shape({
      mtb: PropTypes.number,
      mtbly: PropTypes.number,
      target: PropTypes.number,
      cumplimiento_number: PropTypes.number,
      cumplimiento_porc: PropTypes.number,
      cumplimientoly_number: PropTypes.number,
      cumplimientoly_porc: PropTypes.number,
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
    },
  };

  currency = (x) => {
    let parts = x.toString();
    parts = parts.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts;
  };

  render() {
    const deviceFullWidth = Dimensions.get('window').width;
    const deviceWidth = deviceFullWidth - 30;

    const backgroundImage = require('@assets/images/background-detalle-accion.png');

    const mtb = this.props.data.mtb ? this.currency(this.props.data.mtb) : 0;
    const mtbly = this.props.data.mtbly
      ? this.currency(this.props.data.mtbly)
      : 0;

    const cumplimientoNumber = this.props.data.cumplimiento_number
      ? this.currency(this.props.data.cumplimiento_number)
      : 0;
    const cumplimientoColor =
      this.props.data.cumplimiento_number &&
      this.props.data.cumplimiento_number < 0
        ? 'red'
        : 'black';

    const cumplimientoPorc = this.props.data.cumplimiento_porc
      ? `${this.props.data.cumplimiento_porc}%`
      : `0%`;

    const cumplimientolyNumber = this.props.data.cumplimientoly_number
      ? this.currency(this.props.data.cumplimientoly_number)
      : 0;
    const cumplimientolyColor =
      this.props.data.cumplimientoly_number &&
      this.props.data.cumplimientoly_number < 0
        ? 'red'
        : 'black';

    const cumplimientolyPorc = this.props.data.cumplimientoly_porc
      ? `${this.props.data.cumplimientoly_porc}%`
      : `0%`;

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          backgroundColor: '#FFF',
        }}
      >
        <Image
          style={{
            position: 'absolute',
            top: 0,
            width: deviceFullWidth,
          }}
          source={backgroundImage}
        />

        <View
          style={{
            flex: 1,
            width: deviceWidth,
            marginTop: 30,
            paddingRight: 90,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Questrial',
              fontWeight: 'bold',
              marginBottom: 5,
              alignItems: 'flex-start',
            }}
          >
            {this.props.nombreSala}
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Questrial',
            }}
          >
            {this.props.direccion}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
              }}
            >
              TOTAL SALA
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.3,
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingLeft: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
              }}
            ></Text>
          </View>
          <View
            style={{
              flex: 0.35,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                }}
              >
                MTD
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.35,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                }}
              >
                MTD LY
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingBottom: 5,
              paddingLeft: 15,
              borderRightColor: '#DEDEDE',
              borderRightWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
              }}
            >
              VENTAS
            </Text>
          </View>
          <View
            style={{
              flex: 0.35,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                }}
              >
                ${mtb}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.35,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                }}
              >
                ${mtbly}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingLeft: 15,
              borderRightColor: '#DEDEDE',
              borderRightWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
              }}
            >
              CUMPLIMIENTO
            </Text>
          </View>
          <View
            style={{
              flex: 0.35,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                  color: cumplimientoColor,
                }}
              >
                ${cumplimientoNumber}
              </Text>
            </View>

            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                }}
              >
                {cumplimientoPorc}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.35,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                  color: cumplimientolyColor,
                }}
              >
                ${cumplimientolyNumber}
              </Text>
            </View>

            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                }}
              >
                {cumplimientolyPorc}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default HeaderVentaValor;
