import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

class LoadingOverlay extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "#F4F4F4",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: HEIGHT * 0.45,
            opacity: 0.6
          }
        ]}
      >
        <ActivityIndicator color="#000" animating size="large" />
      </View>
    );
  }
}

const { height: HEIGHT } = Dimensions.get('window');



export default LoadingOverlay;
