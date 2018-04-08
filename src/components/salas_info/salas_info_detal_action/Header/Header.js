import React from "react";
import PropTypes from "prop-types";
import { View, Image, Dimensions, Text } from "react-native";

class Header extends React.Component {
  static propTypes = {
    accion: PropTypes.string,
    monto: PropTypes.string,
    nombreSala: PropTypes.string,
    categoria: PropTypes.string
  };

  static defaultProps = {
    accion: "",
    monto: "",
    nombreSala: "",
    categoria: ""
  };

  render() {
    const deviceFullWidth = Dimensions.get("window").width;
    const deviceWidth = deviceFullWidth - 30;

    const backgroundImage = require("@assets/images/background-detalle-accion.png");

    let reponerImage;
    if (this.props.accion === "Reponer") {
      reponerImage = require("@assets/images/action_reponer.png");
    } else if (this.props.accion === "Chequear pedidos") {
      reponerImage = require("@assets/images/action_chequearpedidos.png");
    } else {
      reponerImage = require("@assets/images/action_ajustar.png");
    }

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 150
        }}
      >
        <Image
          style={{
            position: "absolute",
            top: 0,
            width: deviceFullWidth
          }}
          source={backgroundImage}
        />

        <View
          style={{
            position: "absolute",
            right: 12,
            bottom: 62,
            zIndex: 2500,
            width: 86,
            height: 38,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Questrial",
              fontWeight: "bold"
            }}
          >
            ${this.props.monto}
          </Text>
        </View>

        <Image
          style={{
            position: "absolute",
            bottom: 0,
            right: 5,
            width: 100,
            height: 100,
            zIndex: 1500
          }}
          source={reponerImage}
        />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            width: deviceWidth
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Questrial",
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 70,
              paddingRight: 90
            }}
          >
            {this.props.nombreSala}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Questrial",
              paddingRight: 90
            }}
          >
            Categoria : {this.props.categoria}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Bree",
                fontWeight: "bold",
                marginBottom: 0
              }}
            >
              Productos
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
