import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const Spacer = ({ size }) => (
  <View style={{ height: size }} >
    <Text style={{ color: '#fff', textAlign: 'center' }}>FASFASFAFS</Text>
  </View>
);

Spacer.propTypes = {
  size: PropTypes.number,
};

Spacer.defaultProps = {
  size: 20,
};

export default Spacer;
