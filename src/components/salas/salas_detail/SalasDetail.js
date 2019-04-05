import React from "react";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  DeviceEventEmitter
} from "react-native";
import { Thumbnail, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import Swipeable from "react-native-swipeable";

import _ from "lodash";
import moment from "moment";
import "moment/locale/es";

import { CheckINorCheckOUT } from "@components/salas_info/SalasInfoActions.js";

moment.locale("es");

class SalasDetail extends React.Component {
  static propTypes = {
    CheckINorCheckOUT: PropTypes.func.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      bandera: PropTypes.string,
      date_b2b: PropTypes.string,
      mide: PropTypes.number,
      realizada: PropTypes.number,
      fecha_visita: PropTypes.string,
      direccion: PropTypes.string,
      cod_local: PropTypes.string,
      descripcion: PropTypes.string,
      venta_perdida: PropTypes.number,
      kilometers: PropTypes.number,
      prefijoKilometers: PropTypes.string,
      hasPoll: PropTypes.number,
      visita_en_progreso: PropTypes.number,
      folio: PropTypes.number,
      pendiente: PropTypes.number
    }),
    delay: PropTypes.number,
    lostSaleON: PropTypes.bool,
    endpoint: PropTypes.string
  };

  static defaultProps = {
    data: {
      id: 0,
      bandera: "",
      date_b2b: "",
      mide: 0,
      realizada: 0,
      fecha_visita: "",
      direccion: "",
      cod_local: "",
      descripcion: "",
      folio: 0,
      pendiente: 0
    },
    delay: 100,
    lostSaleON: true,
    endpoint: ""
  };

  constructor(props) {
    super(props);

    DeviceEventEmitter.addListener(
      `checkINEvent-${this.props.data.folio}`,
      () => {
        this.props.data.visita_en_progreso = 1;

        this.setState({
          refresh: !this.state.refresh
        });
      }
    );
  }

  state = {
    refresh: false,
    swipeable: null
  };

  currency = x => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return parts.join(".");
  };

  makeCheckOut = () => {
    Alert.alert(
      "¿CheckOut?",
      `¿Quieres hacer el CheckOUT en ${this.props.data.descripcion} ?`,
      [
        {
          text: "SI, hacer CheckOUT",
          onPress: () => {
            this.props
              .CheckINorCheckOUT(
                this.props.endpoint,
                this.props.data.folio,
                "out"
              )
              .then(() => {
                Alert.alert("Exito", "CheckOUT realizado.", [
                  { text: "Super!" }
                ]);

                this.state.swipeable.recenter();

                this.props.data.visita_en_progreso = 0;

                this.setState({
                  refresh: !this.state.refresh
                });
              });
          }
        },
        { text: "NO", style: "cancel" }
      ]
    );
  };

  render() {
    let logo = "";
    let imagen = null;
    let fecha = "";

    if (this.props.data.bandera === "JUMBO") {
      logo = require("@assets/images/jumbo.png");
    } else if (this.props.data.bandera === "LIDER") {
      logo = require("@assets/images/lider.png");
    } else if (this.props.data.bandera === "LIDER EXPRESS") {
      logo = require("@assets/images/lider_express.png");
    } else if (this.props.data.bandera === "CENTRAL MAYORISTA") {
      logo = require("@assets/images/central-mayorista.png");
    } else if (this.props.data.bandera === "TOTTUS") {
      logo = require("@assets/images/tottus.png");
    } else if (this.props.data.bandera === "EKONO") {
      logo = require("@assets/images/ekono.png");
    } else if (this.props.data.bandera === "ACUENTA") {
      logo = require("@assets/images/acuenta.png");
    } else if (this.props.data.bandera === "SANTA ISABEL") {
      logo = require("@assets/images/santaisabel.png");
    } else if (this.props.data.bandera === "UNIMARC") {
      logo = require("@assets/images/unimarc.png");
    } else if (this.props.data.bandera === "MAYORISTA 10") {
      logo = require("@assets/images/mayorista10.png");
    } else if (this.props.data.bandera === "ALVI") {
      logo = require("@assets/images/alvi.png");
    } else {
      logo = require("@assets/images/logo-cadem-icono.png");
    }

    if (
      this.props.data.mide === 1 &&
      this.props.data.realizada === 1 &&
      this.props.data.pendiente === 0
    ) {
      imagen = require("@assets/images/visita-realizada-v2.png");

      fecha = moment(this.props.data.fecha_visita)
        .add(1, "d")
        .fromNow();
    } else if (this.props.data.mide === 1 && this.props.data.pendiente === 1) {
      imagen = require("@assets/images/visita-pendiente.png");
    }

    const styles = StyleSheet.create({
      rightSwipeItem: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 10
      }
    });

    const rightButtons = [
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.rightSwipeItem, { backgroundColor: "#f3bc32" }]}
        onPress={() => {
          this.makeCheckOut();
        }}
      >
        <Text>¿CheckOut?</Text>
      </TouchableOpacity>
    ];

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1000}
        delay={this.props.delay}
        style={{
          margin: 0,
          padding: 0,
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderBottomColor: "#DEDEDE",
          borderBottomWidth: 1,
          marginBottom: 5
        }}
      >
        <Swipeable
          onRef={ref => {
            this.state.swipeable = ref;
          }}
          rightButtons={
            this.props.data.visita_en_progreso ? rightButtons : null
          }
          rightButtonWidth={110}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex: 1 }}
            onPress={() => {
              Actions.salasInfo({ data: this.props.data });
            }}
          >
            {!_.isNull(imagen) && (
              <Image
                style={{
                  position: "absolute",
                  height: 110,
                  width: 110,
                  right: 0,
                  zIndex: 1000
                }}
                source={imagen}
              />
            )}

            {this.props.data.visita_en_progreso === 1 && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "#f3bc32",
                  padding: 10
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Questrial",
                      fontWeight: "bold"
                    }}
                  >
                    VISITA EN PROGRESO
                  </Text>
                </View>
              </View>
            )}

            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 0.25,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Thumbnail large source={logo} />
              </View>

              <View
                style={{
                  flex: 0.75,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingRight: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Questrial",
                    fontWeight: "bold"
                  }}
                >
                  {this.props.data.descripcion}
                </Text>
                <Text note style={{ fontSize: 12 }}>
                  {this.props.data.direccion}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                marginTop: 10
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Questrial"
                  }}
                >
                  Ultima actualización B2B
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Questrial"
                  }}
                >
                  {this.props.data.date_b2b}
                </Text>
              </View>
            </View>

            {!_.isEmpty(fecha) && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 10
                }}
              >
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Questrial"
                    }}
                  >
                    Fecha de visita
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "center",
                    alignItems: "flex-end"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Questrial"
                    }}
                  >
                    {fecha}
                  </Text>
                </View>
              </View>
            )}

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                marginTop: 10
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Questrial"
                  }}
                >
                  {this.props.lostSaleON ? "Venta Perdida" : "Distancia"}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Questrial"
                  }}
                >
                  {this.props.lostSaleON
                    ? `$${this.currency(this.props.data.venta_perdida)}`
                    : `${this.props.data.kilometers}${
                        this.props.data.prefijoKilometers
                      }`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </Animatable.View>
    );
  }
}

const mapStateToProps = state => ({
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  CheckINorCheckOUT
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasDetail);
