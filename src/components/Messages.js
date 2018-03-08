import React from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

const deviceWidth = Dimensions.get('window').width;

const Messages = ({ message }) => (
  <View style={{
      width: deviceWidth - 35,
      backgroundColor: 'transparent',
      paddingVertical: 10,
      paddingHorizontal: 5,
    }}
  >
    <Text style={{ color: 'red', textAlign: 'center' }}>{message}</Text>
  </View>
);

Messages.propTypes = {
  message: PropTypes.string,
};

Messages.defaultProps = {
  message: 'An unexpected error came up',
};

export default Messages;
