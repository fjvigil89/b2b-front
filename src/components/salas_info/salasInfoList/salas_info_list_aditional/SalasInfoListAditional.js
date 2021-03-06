import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import * as Animatable from "react-native-animatable";
import { Actions } from "react-native-router-flux";
import { Ionicons} from "@expo/vector-icons";

class SalasInfoListAditional extends React.Component {
  static propTypes = {
    acciones: PropTypes.oneOfType([PropTypes.any]),
    sala: PropTypes.number,
    nombreSala: PropTypes.string,
    categoria: PropTypes.string,
    dateb2b: PropTypes.string,
    visitaEnProgreso: PropTypes.number
  };

  static defaultProps = {
    acciones: [],
    sala: "",
    nombreSala: "",
    categoria: "",
    dateb2b: "",
    visitaEnProgreso: 0
  };

  currency = x => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  render() {
    const backgroundImage = require("@assets/images/background-detalle-sala-categoria.png");

    let iterator = 0;
    const categoryDetailSala = this.props.acciones.map(data => {
      iterator += 1;

      return (
        <Animatable.View
          animation="fadeInRight"
          duration={1000}
          style={{
            flex: 1,
            paddingBottom: 1,
            marginBottom: 4
          }}
          key={iterator}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              Actions.salasInfoDetailAction({
                accion: data.accion,
                monto: this.currency(data.monto),
                sala: this.props.sala,
                nombreSala: this.props.nombreSala,
                categoria: this.props.categoria,
                dateb2b: this.props.dateb2b,
                visitaEnProgreso: this.props.visitaEnProgreso
              });
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 0.1,
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name="ios-arrow-round-forward"
                  style={{ fontSize: 30, margin: 0 }}
                />
              </View>
              <View
                style={{
                  flex: 0.9,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  backgroundColor: "#FFF",
                  borderBottomColor: "#DEDEDE",
                  borderBottomWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 0
                }}
              >
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: "column"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 13,
                      fontFamily: "Questrial"
                    }}
                  >
                    {data.accion} ({data.cantidad})
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontFamily: "Questrial",
                      fontWeight: "bold",
                      marginTop: 5
                    }}
                  >
                    ${this.currency(data.monto)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.3,
                    flexDirection: "column"
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 13,
                      fontFamily: "Questrial"
                    }}
                  >
                    Gestionado ({data.casos_gestionados})
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontFamily: "Questrial",
                      fontWeight: "bold",
                      marginTop: 5
                    }}
                  >
                    ${this.currency(data.gestionado)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    alignItems: "flex-end"
                  }}
                >
                  <Ionicons
                    name="ios-arrow-dropright"
                    style={{ fontSize: 30 }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    });

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F4F4F4",
          paddingTop: 0
        }}
      >
        <Image
          style={{
            position: "absolute",
            top: 0,
            height: "100%"
          }}
          source={backgroundImage}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 5,
            paddingBottom: 1,
            paddingRight: 10,
            marginBottom: 5,
            marginLeft: 30
          }}
        >
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
        {categoryDetailSala}
      </View>
    );
  }
}

export default SalasInfoListAditional;
