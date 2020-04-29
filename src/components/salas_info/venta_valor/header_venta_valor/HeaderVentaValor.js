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
    const deviceFullWidth = Dimensions.get('window').width;
    const deviceWidth = deviceFullWidth - 30;

    const backgroundImage = require('@assets/images/background-detalle-accion.png');

    const mtb = this.props.data.mtb ? this.currency(this.props.data.mtb) : 0;
    const mtbly = this.props.data.mtbly
      ? this.currency(this.props.data.mtbly)
      : 0;

    const cumplimientoNumber = this.props.data.cumplimiento_number
      ? this.formatter(this.props.data.cumplimiento_number)
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
      ? this.formatter(this.props.data.cumplimientoly_number)
      : 0;
    const cumplimientolyColor =
      this.props.data.cumplimientoly_number &&
      this.props.data.cumplimientoly_number < 0
        ? 'red'
        : 'black';

    const cumplimientolyPorc = this.props.data.cumplimientoly_porc
      ? `${this.props.data.cumplimientoly_porc}%`
      : `0%`;

    const ytb = this.props.data.ytb ? this.currency(this.props.data.ytb) : 0;
    const ytbly = this.props.data.ytbly
      ? this.currency(this.props.data.ytbly)
      : 0;

    const cumplimientoNumberYear = this.props.data.cumplimiento_number_year
    ? this.formatter(this.props.data.cumplimiento_number_year)
    : 0;

    const cumplimientoColorYear =
      this.props.data.cumplimiento_number_year &&
      this.props.data.cumplimiento_number_year < 0
        ? 'red'
        : 'black';

    const cumplimientoPorcYear = this.props.data.cumplimiento_porc_year
      ? `${this.props.data.cumplimiento_porc_year}%`
      : `0%`;

    const cumplimientolyNumberYear = this.props.data.cumplimientoly_number_year
      ? this.formatter(this.props.data.cumplimientoly_number_year)
      : 0;

    const cumplimientolyColorYear =
      this.props.data.cumplimientoly_number_year &&
      this.props.data.cumplimientoly_number_year < 0
        ? 'red'
        : 'black';

    const cumplimientolyPorcYear = this.props.data.cumplimientoly_porc_year
      ? `${this.props.data.cumplimientoly_porc_year}%`
      : `0%`;

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
                  fontSize: 13,
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
                  fontSize: 13,
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
                  fontSize: 13,
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
                  fontSize: 13,
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
                  fontSize: 13,
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                {cumplimientolyPorc}
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
                YTD
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
                YTD LY
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                ${ytbly}
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                  color: cumplimientoColorYear,
                }}
              >
                ${cumplimientoNumberYear}
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                {cumplimientoPorcYear}
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                  color: cumplimientolyColorYear,
                }}
              >
                ${cumplimientolyNumberYear}
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                {cumplimientolyPorcYear}
              </Text>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

export default HeaderVentaValor;
