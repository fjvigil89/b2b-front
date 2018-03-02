import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Image, View } from 'react-native';
import { Thumbnail, Text } from 'native-base';

class SalaDetail extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      imagen: PropTypes.string,
      sala: PropTypes.string,
      date: PropTypes.string,
      estado: PropTypes.number,
    }),
    delay: PropTypes.number,
  }

  static defaultProps = {
    data: {
      id: 0,
      imagen: '',
      sala: '',
      date: '-',
      estado: 3,
    },
    delay: 100,
  }

  render() {
    let logo = '';
    let imagen = '';
    const fechaB2B = this.props.data.estado === 1 ? this.props.data.date : 'Sin fecha';

    if (this.props.data.imagen === 'jumbo') {
      logo = require('../images/jumbo.png');
    } else if (this.props.data.imagen === 'lider') {
      logo = require('../images/lider.png');
    } else if (this.props.data.imagen === 'tottus') {
      logo = require('../images/tottus.png');
    }

    if (this.props.data.estado === 1) {
      imagen = require('../images/con-medicion-b2b.png');
    } else if (this.props.data.estado === 2) {
      imagen = require('../images/pendiente-visita.png');
    }

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1000}
        delay={this.props.delay}
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
        {(this.props.data.estado === 1 || this.props.data.estado === 2) &&
          <Image
            style={{
              position: 'absolute',
              height: 110,
              width: 110,
              right: 0,
              zIndex: 1000,
            }}
            source={imagen}
          />
        }

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
              {this.props.data.sala}
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
              Ultima actualización B2B
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
              {fechaB2B}
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  }
}

export default SalaDetail;
