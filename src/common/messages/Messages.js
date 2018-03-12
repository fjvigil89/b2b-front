import React from "react";
import { View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Text } from "native-base";

const deviceWidth = Dimensions.get("window").width;

class Messages extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };

  static defaultProps = {
    message: ""
  };

  render() {
    return (
      <View
        style={{
          width: deviceWidth - 35,
          backgroundColor: "transparent",
          paddingVertical: 10,
          paddingHorizontal: 5
        }}
      >
        <Text style={{ color: "red", textAlign: "center" }}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

export default Messages;
