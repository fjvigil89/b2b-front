import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Text, Content } from 'native-base';

const viewHeight = Dimensions.get('window').height;
const nosalas = require('../images/no-salas.png');

const NoSalas = () => (
  <Content
    style={{
        backgroundColor: '#F4F4F4',
    }}
    scrollEnabled={false}
  >
    <View
      style={{
        flex: 1,
        height: viewHeight - 128,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 0.6,
          justifyContent: 'flex-end',
        }}
      >
        <Image
          source={nosalas}
        />
      </View>
      <View style={{ flex: 0.4 }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Questrial',
            fontWeight: 'bold',
            paddingTop: 25,
          }}
        >NO SE ENCUENTRAN SALAS
        </Text>
      </View>
    </View>
  </Content>
);

export default NoSalas;
