import React from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

import Colors from '../../native-base-theme/variables/commonColor';

const deviceWidth = Dimensions.get('window').width;

const Messages = ({ message, type }) => (
  <View style={{
      width: deviceWidth - 35,
      backgroundColor: (type === 'error') ? Colors.brandDanger : (type === 'success') ? Colors.brandSuccess : Colors.brandInfo,
      paddingVertical: 10,
      paddingHorizontal: 5,
    }}
  >
    <Text style={{ color: '#fff', textAlign: 'center' }}>{message}</Text>
  </View>
);

Messages.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info']),
};

Messages.defaultProps = {
  message: 'An unexpected error came up',
  type: 'error',
};

export default Messages;
