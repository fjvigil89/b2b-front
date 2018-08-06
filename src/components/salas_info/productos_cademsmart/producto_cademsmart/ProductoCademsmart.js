import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";

class ProductoCademsmart extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      valor: PropTypes.oneOfType([() => null, PropTypes.string]),
      descripcion: PropTypes.string,
      ean: PropTypes.string,
      categoria: PropTypes.string
    })
  };

  static defaultProps = {
    data: {
      valor: null,
      descripcion: "",
      ean: "",
      categoria: ""
    }
  };

  render() {
    let thumbImage;

    if (this.props.data.valor === 1) {
      thumbImage = require("@assets/images/thumb.png");
    } else if (this.props.data.valor === 0) {
      thumbImage = require("@assets/images/thumb-down.png");
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
        {(this.props.data.valor === 1 || this.props.data.valor === 0) && (
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
            {this.props.data.categoria}
          </Text>
        </View>
      </View>
    );
  }
}

export default ProductoCademsmart;
