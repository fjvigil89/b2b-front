import React from "react";
import { View } from "react-native";
import { Text } from "native-base";

class SalasInfoDetailAction extends React.Component {
  static defaultProps = {
    acciones: []
  };

  render() {
    return (
      <View>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Bree",
            fontWeight: "bold"
          }}
        >
          Detalle de la Categoria
        </Text>
      </View>
    );
  }
}

export default SalasInfoDetailAction;
