import React from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "@assets/native-base-theme/variables//commonColor";

class Loading extends React.Component {
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color={Colors.brandPrimary} />
      </View>
    );
  }
}

export default Loading;
