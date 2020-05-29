import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@assets/native-base-theme/variables//commonColor';
class CategoriasVentaValor extends React.Component {
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
    const nombre = this.props.data[0];
    const mtd = this.props.data[1].mtd
      ? `$${this.formatter(this.props.data[1].mtd)}`
      : `-`;
    const mtdLy = this.props.data[1].mtdLy
      ? `$${this.formatter(this.props.data[1].mtdLy)}`
      : `-`;

    const ventaMtdMtdLyPorc =
      this.props.data[1].mtd > 0 && this.props.data[1].mtdLy > 0
        ? `${(
            100 -
            (this.props.data[1].mtd * 100) / this.props.data[1].mtdLy
          ).toFixed(1)}`
        : `-`;

    console.log('DATA >>> ', this.props.data[1].mtd, mtdLy);

    return (
      <View
        style={{
          height: 100,
          backgroundColor: '#FFF',
        }}
      >
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.45,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                  color: Colors.brandInfo,
                }}
              >
                {nombre}
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
              }}
            >
              <Text
                style={{
                  fontSize: 12,
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
              flex: 0.35,
              flexDirection: 'row',
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
              flex: 0.4,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 15,
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                borderTopColor: '#DEDEDE',
                borderTopWidth: 1,
                backgroundColor: '#F2F2F2',
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
                VENTA (MTD)
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderBottomColor: '#DEDEDE',
                borderRightColor: '#DEDEDE',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                paddingLeft: 15,
                backgroundColor: '#DAE0F0',
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
                VENTA (MTD LY)
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
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                borderTopColor: '#DEDEDE',
                borderTopWidth: 1,
                backgroundColor: '#F2F2F2',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                {mtd}
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                backgroundColor: '#DAE0F0',
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
                  {mtdLy}
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
                flex: 0.6,
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
                {this.semaforo(ventaMtdMtdLyPorc)}
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Questrial',
                  }}
                >
                  {Math.abs(ventaMtdMtdLyPorc)
                    ? `${Math.abs(ventaMtdMtdLyPorc)} %`
                    : `-`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CategoriasVentaValor;
