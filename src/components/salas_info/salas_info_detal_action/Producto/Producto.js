import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";

class Producto extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      cadem: PropTypes.oneOfType([() => null, PropTypes.string]),
      descripcion: PropTypes.string,
      ean: PropTypes.number,
      sventa: PropTypes.string,
      stock: PropTypes.number,
      stock_transito: PropTypes.oneOfType([() => null, PropTypes.number]),
    }),
    flag: PropTypes.bool,
    accion: PropTypes.string
  };

  static defaultProps = {
    flag: false,
    data: {
      cadem: null,
      descripcion: "",
      ean: 0,
      sventa: "",
      stock: 0,
      stock_transito: "",
    },
    accion: ""
  };

  render() {
    let thumbImage;

    if (this.props.data.cadem === 1) {
      thumbImage = require("@assets/images/thumb.png");
    } else if (this.props.data.cadem === 0) {
      thumbImage = require("@assets/images/thumb-down.png");
    }

    let visibilityText = false;
    if (this.props.accion === "Reponer" || this.props.accion === "Ajustar") {
      visibilityText = true;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#FFF",
          borderBottomColor: "#DEDEDE",
          borderBottomWidth: 1,
          padding: 10,
          paddingTop: 5
        }}
      >
        {(this.props.data.cadem === 1 || this.props.data.cadem === 0) && (
          <Image
            style={{
              position: "absolute",
              height: 100,
              width: 100,
              bottom: 0,
              right: 0,
              zIndex: 1000
            }}
            source={thumbImage}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              fontSize: 12,
              fontFamily: "Questrial"
            }}
          >
            EAN : {this.props.data.ean}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              fontSize: 16,
              fontFamily: "Questrial"
            }}
          >
            {this.props.data.descripcion}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              fontSize: 12,
              fontWeight: "bold",
              fontFamily: "Questrial"
            }}
          >
            Días sin venta: {this.props.data.sventa}
          </Text>
        </View>
        {visibilityText && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              fontSize: 12,
              fontWeight: "bold",
              fontFamily: "Questrial"
            }}
          >
            Stock: {this.props.data.stock}
          </Text>
        </View>
        )}
        {this.props.flag && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 5
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                fontSize: 12,
                fontWeight: "bold",
                fontFamily: "Questrial"
              }}
            >
              Stock en transito: {this.props.data.stock_transito}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default Producto;
