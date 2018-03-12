import React from "react";
import { View, Dimensions, Image } from "react-native";
import { Text } from "native-base";

const viewHeight = Dimensions.get("window").height;
const nosalas = require("@assets/images/no-salas.png");

const SalasEmpty = () => (
  <View
    style={{
      flex: 1,
      height: viewHeight - 128,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <View
      style={{
        flex: 0.6,
        justifyContent: "flex-end"
      }}
    >
      <Image source={nosalas} />
    </View>
    <View style={{ flex: 0.4 }}>
      <Text
        style={{
          fontSize: 22,
          fontFamily: "Questrial",
          fontWeight: "bold",
          paddingTop: 25
        }}
      >
        NO SE ENCUENTRAN SALAS
      </Text>
    </View>
  </View>
);

export default SalasEmpty;
