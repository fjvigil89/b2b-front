import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, DeviceEventEmitter } from "react-native";
import { Text } from "native-base";

import SalasInfoListAditional from "@components/salas_info/salas_info_list/salas_info_list_aditional/SalasInfoListAditional";

class SalasInfoListDetail extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    sala: PropTypes.number,
    nombreSala: PropTypes.string,
    categoria: PropTypes.string,
    dateb2b: PropTypes.string,
    visitaEnProgreso: PropTypes.string
  };

  static defaultProps = {
    sala: "",
    nombreSala: "",
    categoria: "",
    dateb2b: "",
    visitaEnProgreso: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      aditionalPanel: false,
      casosGestionados: this.props.data.casos_gestionados,
      gestionado: this.props.data.gestionado
    };

    DeviceEventEmitter.addListener(
      `SalaDetalleCategoria-${this.props.sala}-${this.props.categoria.replace(
        /\s/g,
        ""
      )}`,
      e => {
        this.setState({
          casosGestionados: this.state.casosGestionados + 1,
          gestionado: this.state.gestionado + e.gestionado
        });
      }
    );
  }

  currency = x => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  render() {
    const { data } = this.props;

    let porcentajeProgreso = this.state.gestionado * 100 / data.venta_perdida;
    porcentajeProgreso = `${porcentajeProgreso}%`;

    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#DEDEDE",
            borderBottomWidth: 1,
            paddingRight: 0,
            marginRight: 0,
            height: 50
          }}
          onPress={() => {
            this.setState({ aditionalPanel: !this.state.aditionalPanel });
          }}
        >
          <View
            style={{
              flex: 0.55,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: 10
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                fontSize: 13,
                fontFamily: "Questrial"
              }}
            >
              {data.categoria}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "flex-end",
              padding: 10
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Questrial"
              }}
            >
              {this.state.casosGestionados} / {data.casos}
            </Text>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: "center",
              alignItems: "flex-end",
              padding: 10
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Questrial"
              }}
            >
              ${this.currency(this.props.data.venta_perdida)}
            </Text>
          </View>

          <View
            style={{
              height: 50,
              backgroundColor: "#3cb3d0",
              width: porcentajeProgreso,
              left: 0,
              position: "absolute",
              opacity: 0.2
            }}
          />
        </TouchableOpacity>
        {this.state.aditionalPanel && (
          <SalasInfoListAditional
            acciones={data.acciones}
            sala={this.props.sala}
            nombreSala={this.props.nombreSala}
            categoria={this.props.categoria}
            dateb2b={this.props.dateb2b}
            casosGestionados={data.casos_gestionados}
            visitaEnProgreso={this.props.visitaEnProgreso}
          />
        )}
      </View>
    );
  }
}

export default SalasInfoListDetail;
