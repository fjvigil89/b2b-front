import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";

import SalasInfoListAditional from "@components/salas_info/salas_info_list/salas_info_list_aditional/SalasInfoListAditional";

class SalasInfoListDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      aditionalPanel: false
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#DEDEDE",
            borderBottomWidth: 1,
            padding: 10
          }}
          onPress={() => {
            this.setState({ aditionalPanel: !this.state.aditionalPanel });
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                fontSize: 13,
                fontFamily: "Questrial",
                fontWeight: "bold"
              }}
            >
              Chocolates de color amarillo con sabor a pajarito y de contextura
              de mierda
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Questrial"
              }}
            >
              123
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: 10
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Questrial"
              }}
            >
              1.500.000
            </Text>
          </View>
        </TouchableOpacity>

        {this.state.aditionalPanel && <SalasInfoListAditional />}
      </View>
    );
  }
}

export default SalasInfoListDetail;
