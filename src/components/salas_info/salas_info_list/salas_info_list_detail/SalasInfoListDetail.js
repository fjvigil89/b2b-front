import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";

import SalasInfoListAditional from "@components/salas_info/salas_info_list/salas_info_list_aditional/SalasInfoListAditional";

class SalasInfoListDetail extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.any
    ]),
  };

  static defaultProps = {
    data: {},
  };


  constructor(props) {
    super(props);
    this.state = {
      aditionalPanel: false,
    };
  }

  currency = (x) => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  render() {
    const { data } = this.props;
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
              }}
            >
              {data.categoria}
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
              {data.casos}
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
              ${this.currency(data.venta_perdida)}
            </Text>
          </View>
        </TouchableOpacity>
        {this.state.aditionalPanel && <SalasInfoListAditional acciones={data.acciones}/>}
      </View>
    );
  }
}

export default SalasInfoListDetail;
