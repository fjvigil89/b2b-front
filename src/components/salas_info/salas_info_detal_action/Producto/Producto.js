import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Swipeable from "react-native-swipeable";

const styles = StyleSheet.create({
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10
  }
});

const leftButtons = [
  <TouchableOpacity
    activeOpacity={0.8}
    style={[styles.leftSwipeItem, { backgroundColor: "#f3bc32" }]}
  >
    <Text>Gestionar</Text>
    <Text>Caso</Text>
  </TouchableOpacity>
];

const rightButtons = [
  <TouchableOpacity
    activeOpacity={0.8}
    style={[styles.rightSwipeItem, { backgroundColor: "#f3bc32" }]}
    onPress={() => {
      this.makeCheckOut();
    }}
  >
    <Text>Caso</Text>
    <Text>Expirado</Text>
  </TouchableOpacity>
];

class Producto extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      cadem: PropTypes.oneOfType([() => null, PropTypes.string]),
      descripcion: PropTypes.string,
      ean: PropTypes.number,
      sventa: PropTypes.number,
      stock: PropTypes.number,
      stock_transito: PropTypes.oneOfType([() => null, PropTypes.number]),
      venta_perdida: PropTypes.number
    }),
    flag: PropTypes.bool,
    accion: PropTypes.string,
    dateb2b: PropTypes.string,
    endpoint: PropTypes.string,
    sala: PropTypes.string,
    causa: PropTypes.string
  };

  static defaultProps = {
    flag: false,
    data: {
      cadem: null,
      descripcion: "",
      ean: 0,
      sventa: 0,
      stock: 0,
      stock_transito: "",
      venta_perdida: 0
    },
    accion: "",
    dateb2b: "",
    endpoint: "",
    sala: "",
    causa: ""
  };

  state = {
    swipeable: null,
    gestionado: this.props.data.gestionado !== 0
  };

  makeGestionado = () => {
    console.log(
      this.props.endpoint,
      this.props.sala,
      "gestionado",
      this.props.causa,
      this.props.data.ean,
      this.props.data.venta_perdida,
      this.props.dateb2b
    );

    // this.props.Gestionado(
    //   this.props.endpoint,
    //   this.props.sala,
    //   "gestionado",
    //   this.props.causa,
    //   this.props.data.ean,
    //   this.props.data.venta_perdida,
    //   this.props.dateb2b
    // );

    this.setState({
      gestionado: true
    });
  };

  render() {
    let thumbImage;

    console.log(this.props);

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
      <Swipeable
        onRef={ref => {
          this.state.swipeable = ref;
        }}
        rightButtons={rightButtons}
        rightButtonWidth={110}
        leftContent={this.state.gestionado ? null : leftButtons}
        onLeftActionRelease={() => {
          this.makeGestionado();
        }}
      >
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
            {this.state.gestionado && (
              <View
                style={{
                  flex: 0.3,
                  backgroundColor: "#f3bc32",
                  padding: 3,
                  borderRadius: 5,
                  alignItems: "center"
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
                  GESTIONADO
                </Text>
              </View>
            )}

            <View style={{ flex: 0.7, alignItems: "flex-end" }}>
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
      </Swipeable>
    );
  }
}

const mapStateToProps = state => ({
  endpoint: state.user.endpoint
});

export default connect(mapStateToProps, null)(Producto);
