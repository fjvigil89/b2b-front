import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Image, View } from 'react-native';
import { Thumbnail, Text } from 'native-base';

const pendienteVisita = require('../images/pendiente-visita.png');

class SalaDetail extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      imagen: PropTypes.string,
      sala: PropTypes.string,
      b2b: PropTypes.number,
    }),
  }

  static defaultProps = {
    data: {
      id: 0,
      imagen: '',
      sala: '',
      b2b: 0,
    },
  }

  render() {
    let logo = '';

    if (this.props.data.imagen === 'jumbo') {
      logo = require('../images/jumbo.png');
    }

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1000}
        style={{
          margin: 0,
          padding: 0,
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#DEDEDE',
          borderBottomWidth: 1,
          marginBottom: 5,
        }}
      >
        <Image
          style={{
            position: 'absolute',
            height: 110,
            width: 110,
            right: 0,
            zIndex: 1000,
          }}
          source={pendienteVisita}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Thumbnail large source={logo} />
          </View>

          <View style={{
            flex: 0.75,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
          >
            <Text style={{
              fontSize: 22,
              fontFamily: 'Questrial',
              fontWeight: 'bold',
            }}
            >
              JUMBO Costanera Center
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{
                fontSize: 12,
                fontFamily: 'Questrial',
              }}
            >
              Ultima actualización
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Text style={{
                fontSize: 12,
                fontFamily: 'Questrial',
              }}
            >
            12 de Febrero de 20018
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  }
}

export default SalaDetail;
