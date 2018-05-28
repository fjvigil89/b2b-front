import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

class LoadingOverlay extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "#F4F4F4",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.6
          }
        ]}
      >
        <ActivityIndicator color="#000" animating size="large" />
      </View>
    );
  }
}

export default LoadingOverlay;
