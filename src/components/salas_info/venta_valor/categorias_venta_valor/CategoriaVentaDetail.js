import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text, ScrollView } from 'react-native';

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

  render() {
    const nombre = this.props.data[0];
    const mtd = this.props.data[1].mtd ? this.currency(this.props.data[1].mtd) : 0;
    const mtdLy = this.props.data[1].mtdLy ? this.currency(this.props.data[1].mtdLy) : 0;
    const ytd = this.props.data[1].ytd ? this.currency(this.props.data[1].ytd) : 0;
    const ytdLy = this.props.data[1].ytdLy ? this.currency(this.props.data[1].ytdLy) : 0;

    return (
      <View
        style={{
          height: 100,
          backgroundColor: '#FFF',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
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
                alignItems: 'flex-start',
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
                paddingLeft: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                  color: 'green'
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
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                }}
              >
                MTD / YTD
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
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Bree',
                  fontWeight: 'bold',
                }}
              >
                MTD LY / YTD LY
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.75,
            flexDirection: 'row',
            padding: 0,
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
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Bree',
                fontWeight: 'bold',
              }}
            >
              VENTAS (MES)
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
                ${mtd}
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
                  fontSize: 13,
                  fontFamily: 'Questrial',
                }}
              >
                ${mtdLy}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.75,
            flexDirection: 'row',
            padding: 0,
          }}
        >
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
              VENTAS (ANUAL)
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
                borderRightColor: '#DEDEDE',
                borderRightWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Questrial',
                  color: 'black',
                }}
              >
                ${ytd}
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
                borderBottomColor: '#DEDEDE',
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Questrial',
                  color: 'black',
                }}
              >
                ${ytdLy}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CategoriasVentaValor;
