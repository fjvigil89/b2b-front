import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, Text } from 'react-native';

class HeaderCademsmart extends React.Component {
  static propTypes = {
    porcentaje: PropTypes.string,
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    ultimaMedicion: PropTypes.string,
  };

  static defaultProps = {
    porcentaje: '',
    nombreSala: '',
    direccion: '',
    ultimaMedicion: '',
  };

  render() {
    const deviceFullWidth = Dimensions.get('window').width;
    const deviceWidth = deviceFullWidth - 30;

    const backgroundImage = require('@assets/images/background-detalle-accion.png');
    const reponerImage = require('@assets/images/action_presencia.png');

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 150,
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

        {/* <View
          style={{
            position: 'absolute',
            right: 12,
            bottom: 62,
            zIndex: 2500,
            width: 86,
            height: 38,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Questrial',
              fontWeight: 'bold',
            }}
          >
            {this.props.porcentaje}
          </Text>
        </View>

        <Image
          style={{
            position: 'absolute',
            bottom: 0,
            right: 5,
            width: 100,
            height: 100,
            zIndex: 1500,
          }}
          source={reponerImage}
        /> */}

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
              marginBottom: 10,
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

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Questrial',
            }}
          >
            Ult. medición CademSmart : {this.props.ultimaMedicion}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
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
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
              }}
            >
              Indicadores
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HeaderCademsmart;
