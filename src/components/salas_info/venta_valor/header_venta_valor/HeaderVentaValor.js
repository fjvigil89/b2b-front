import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text } from 'react-native';
import Colors from '@assets/native-base-theme/variables//commonColor';
import { Ionicons } from '@expo/vector-icons';

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
    if (parseFloat(num) <= 0) {
      return (
        <Ionicons
          style={{
            color: 'green',
            fontSize: 15,
            marginRight: 2,
          }}
          name="ios-arrow-round-up"
        />
      );
    } else if (parseFloat(num) > 0) {
      return (
        <Ionicons
          style={{
            color: 'red',
            fontSize: 15,
            marginRight: 2,
          }}
          name="ios-arrow-round-down"
        />
      );
    } else {
      return <></>;
    }
  };

  render() {
    const deviceFullWidth = Dimensions.get('window').width;
    const deviceWidth = deviceFullWidth - 30;

    const backgroundImage = require('@assets/images/background-detalle-accion.png');

    const mtb = this.props.data.mtb ? this.formatter(this.props.data.mtb) : 0;
    const mtbly = this.props.data.mtbly
      ? this.formatter(this.props.data.mtbly)
      : 0;

    const ytb = this.props.data.ytb ? this.formatter(this.props.data.ytb) : 0;
    const ytbly = this.props.data.ytbly
      ? this.formatter(this.props.data.ytbly)
      : 0;

    const target =
      this.props.data.target > 0
        ? `$ ${this.formatter(this.props.data.target)}`
        : `-`;

    const ventaTargetPorc =
      this.props.data.target > 0
        ? `${((this.props.data.mtb / this.props.data.target) * 100).toFixed(
            1
          )}%`
        : `-`;

    const ventaMtdPorc =
      this.props.data.mtb > 0 && this.props.data.mtbly > 0
        ? `${(
            100 -
            (this.props.data.mtb * 100) / this.props.data.mtbly
          ).toFixed(1)}`
        : `-`;

    const ventaYtdPorc =
      this.props.data.ytb > 0 && this.props.data.ytbly > 0
        ? `${(
            100 -
            (this.props.data.ytb * 100) / this.props.data.ytbly
          ).toFixed(1)}`
        : `-`;

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 350,
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
            backgroundColor: Colors.brandPrimary,
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
                fontSize: 16,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                color: '#FFF',
                marginBottom: 0,
              }}
            >
              VENTAS TOTAL SALA
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
              flex: 0.4,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              paddingBottom: 5,
              paddingLeft: 15,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
                color: Colors.brandPrimary,
              }}
            >
              VENTAS V/S TARGET
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                  color: Colors.brandPrimary,
                }}
              >
                VENTA ($)
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
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
              ></Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.4,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 15,
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
                borderTopColor: '#DEDEDE',
                borderTopWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                  color: '#6D6D6D',
                }}
              >
                VENTAS MTD
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderBottomColor: '#DEDEDE',
                borderRightColor: '#DEDEDE',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                paddingLeft: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  color: '#6D6D6D',
                }}
              >
                TARGET
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
                // borderBottomColor: '#DEDEDE',
                // borderBottomWidth: 1,
                borderTopColor: '#DEDEDE',
                borderTopWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                ${mtb}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
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
                    fontSize: 13,
                    fontFamily: 'Questrial',
                  }}
                >
                  {target}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flex: 1,
                borderTopColor: '#DEDEDE',
                borderTopWidth: 1,
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'Questrial',
                  }}
                >
                  {ventaTargetPorc}
                </Text>
              </View>
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
              flex: 0.42,
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
                color: '#6D6D6D',
              }}
            >
              VENTAS YTD
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                ${ytb}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.35,
              flexDirection: 'row',
            }}
          ></View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingLeft: 15,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
                color: Colors.brandPrimary,
              }}
            >
              VARIACIONES
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
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
                  fontSize: 13,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                  color: Colors.brandPrimary,
                }}
              >
                VENTAS ($)
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
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
              ></Text>
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
              flex: 0.42,
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
                color: '#6D6D6D',
              }}
            >
              VENTAS MTD LY
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
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                ${mtbly}
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
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
              }}
            >
              {this.semaforo(ventaMtdPorc)}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                }}
              >
                {Math.abs(ventaMtdPorc) ? `${Math.abs(ventaMtdPorc)}%` : `-`}
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
              flex: 0.42,
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
                color: '#6D6D6D',
              }}
            >
              VENTAS YTD LY
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                ${ytbly}
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
                flexDirection: 'row',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {this.semaforo(ventaYtdPorc)}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Questrial',
                }}
              >
                {Math.abs(ventaYtdPorc) ? `${Math.abs(ventaYtdPorc)}%` : `-`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default HeaderVentaValor;
