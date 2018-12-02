import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  DeviceEventEmitter
} from "react-native";
import Swipeable from "react-native-swipeable";

import MarcarProducto from "@components/salas_info/salas_info_detal_action/Producto/ProductoAction";

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
    style={[styles.rightSwipeItem, { backgroundColor: "#ef4247" }]}
  >
    <Text style={{ color: "white" }}>Caso</Text>
    <Text style={{ color: "white" }}>Expirado</Text>
  </TouchableOpacity>
];

class Producto extends React.Component {
  static propTypes = {
    MarcarProducto: PropTypes.func.isRequired,
    data: PropTypes.shape({
      cadem: PropTypes.oneOfType([() => null, PropTypes.string]),
      descripcion: PropTypes.string,
      ean: PropTypes.number,
      sventa: PropTypes.number,
      stock: PropTypes.number,
      stock_transito: PropTypes.oneOfType([() => null, PropTypes.number]),
      venta_perdida: PropTypes.number,
      gestionado: PropTypes.number
    }),
    flag: PropTypes.bool,
    accion: PropTypes.string,
    dateb2b: PropTypes.string,
    endpoint: PropTypes.string,
    sala: PropTypes.string,
    causa: PropTypes.string,
    categoria: PropTypes.string,
    visitaEnProgreso: PropTypes.string
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
      venta_perdida: 0,
      gestionado: 0
    },
    accion: "",
    dateb2b: "",
    endpoint: "",
    sala: "",
    causa: "",
    categoria: "",
    visitaEnProgreso: ""
  };

  state = {
    swipeable: null,
    gestionado: this.props.data.gestionado !== 0,
    expirado: false
  };

  makeGestionado = () => {
    this.props.MarcarProducto(
      this.props.endpoint,
      this.props.sala,
      "gestionado",
      this.props.causa,
      this.props.data.ean,
      this.props.data.venta_perdida,
      this.props.dateb2b
    );

    this.setState({
      gestionado: true
    });

    DeviceEventEmitter.emit(
      `SalaDetalleCategoria-${this.props.sala}-${this.props.categoria.replace(
        /\s/g,
        ""
      )}`,
      { gestionado: this.props.data.venta_perdida }
    );

    DeviceEventEmitter.emit(`SalaDetalle-${this.props.sala}`, {
      gestionado: this.props.data.venta_perdida
    });
  };

  makeExpirado = () => {
    this.props.MarcarProducto(
      this.props.endpoint,
      this.props.sala,
      "expirado",
      this.props.causa,
      this.props.data.ean,
      this.props.data.venta_perdida,
      this.props.dateb2b
    );

    this.setState({
      expirado: true
    });
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
      <Swipeable
        onRef={ref => {
          this.state.swipeable = ref;
        }}
        rightContent={
          !this.state.gestionado &&
          !this.state.expirado &&
          this.props.visitaEnProgreso === 1
            ? rightButtons
            : null
        }
        onRightActionRelease={() => {
          this.makeExpirado();
        }}
        leftContent={
          !this.state.gestionado &&
          !this.state.expirado &&
          this.props.visitaEnProgreso === 1
            ? leftButtons
            : null
        }
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
            {this.state.gestionado &&
              !this.state.expirado && (
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

            {!this.state.gestionado &&
              this.state.expirado && (
                <View
                  style={{
                    flex: 0.3,
                    backgroundColor: "#ef4247",
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
                      fontFamily: "Questrial",
                      color: "white"
                    }}
                  >
                    EXPIRADO
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

const mapDispatchToProps = {
  MarcarProducto
};

export default connect(mapStateToProps, mapDispatchToProps)(Producto);
