import React from "react";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import { Image, View, TouchableOpacity } from "react-native";
import { Text } from "native-base";

import moment from "moment";
import "moment/locale/es";

// import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

moment.locale("es");

class DetailReport extends React.Component {
  static propTypes = {
    colorVentas: PropTypes.string,
    iconoVentas: PropTypes.string,
    colorVentasPerdidas: PropTypes.string,
    iconoVentasPerdidas: PropTypes.string,
    data: PropTypes.shape({
      nombre: PropTypes.string,
      ventas: PropTypes.shape({
        total: PropTypes.string,
        variacion: PropTypes.string,
        causas: PropTypes.shape({
          mismas_salas: PropTypes.number,
          productos_descatalogados: PropTypes.number,
          productos_nuevos: PropTypes.number,
          salas_cerradas: PropTypes.number,
          salas_nuevas: PropTypes.number
        })
      }),
      ventas_perdidas: PropTypes.shape({
        total: PropTypes.string,
        variacion: PropTypes.string,
        causas: PropTypes.shape({
          chequear_pedidos: PropTypes.number,
          desajuste_stock: PropTypes.number,
          productos_descatalogados: PropTypes.number,
          reposicion: PropTypes.number
        })
      })
    })
  };

  static defaultProps = {
    colorVentas: "",
    iconoVentas: "",
    colorVentasPerdidas: "",
    iconoVentasPerdidas: "",
    data: {
      nombre: "",
      ventas: {
        total: 0,
        variacion: "",
        causas: {
          mismas_salas: 0,
          productos_descatalogados: 0,
          productos_nuevos: 0,
          salas_cerradas: 0,
          salas_nuevas: 0
        }
      },
      ventas_perdidas: {
        total: 0,
        variacion: "",
        causas: {
          chequear_pedidos: 0,
          desajuste_stock: 0,
          productos_descatalogados: 0,
          reposicion: 0
        }
      }
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      aditionalPanelFirst: false,
      aditionalPanelSecond: false,
      buttonCollapsedFirst: false,
      buttonCollapsedSecond: false
    };
  }

  formatter = num => {
    const formatterNumber = x => {
      const parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      return parts.join(".");
    };

    const numInt = parseInt(num, 10);
    const numAbs = Math.abs(numInt);
    const formNum = formatterNumber(numInt).split(".");

    if (numAbs < 1000000) {
      let numDivByMillon = (parseInt(formNum[0], 10) / 1000000).toString();
      if (numDivByMillon.length > 4) {
        numDivByMillon = numDivByMillon.slice(0, 4);
      }
      return `${numDivByMillon} m`;
    }

    if (numAbs >= 1000000 && numAbs < 1000000000) {
      return `${formNum[0]}.${formNum[1].slice(0, 1)} m`;
    }

    if (numAbs >= 1000000000) {
      return `${formNum[0]}.${formNum[1].slice(0, 2)} mm`;
    }
  };

  render() {
    const backgroundImage = require("@assets/images/background-detalle-sala-categoria.png");
    const {
      nombre,
      fecha_actualizacion,
      ventas,
      ventas_perdidas: ventasPerdidas
    } = this.props.data;

    let logo = "";
    // TODO: revisar nombre de lider e hiperlider

    if (nombre === "JUMBO") {
      logo = require("@assets/images/jumbo.png");
    } else if (nombre === "LIDER") {
      logo = require("@assets/images/lider.png");
    } else if (nombre === "HIPER LIDER") {
      logo = require("@assets/images/lider.png");
    } else if (nombre === "LIDER EXPRESS") {
      logo = require("@assets/images/lider_express.png");
    } else if (nombre === "CENTRAL MAYORISTA") {
      logo = require("@assets/images/central-mayorista.png");
    } else if (nombre === "TOTTUS") {
      logo = require("@assets/images/tottus.png");
    } else if (nombre === "EKONO") {
      logo = require("@assets/images/ekono.png");
    } else if (nombre === "ACUENTA") {
      logo = require("@assets/images/acuenta.png");
    } else if (nombre === "SANTA ISABEL") {
      logo = require("@assets/images/santaisabel.png");
    } else if (nombre === "UNIMARC") {
      logo = require("@assets/images/unimarc.png");
    } else if (nombre === "MAYORISTA 10") {
      logo = require("@assets/images/mayorista10.png");
    } else if (nombre === "ALVI") {
      logo = require("@assets/images/alvi.png");
    } else if (nombre === "OK MARKET") {
      logo = require("@assets/images/okmarket.png");
    } else {
      logo = require("@assets/images/logo-cadem-icono.png");
    }

    return (
      <View style={{ flex: 1, marginBottom: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#FFF",
            padding: 5,
            borderBottomColor: "#DEDEDE",
            borderBottomWidth: 1
          }}
        >
          <Text
            style={{
              fontFamily: "Questrial",
              fontSize: 12
            }}
          >
            Fecha información B2B: {fecha_actualizacion}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#DEDEDE",
            borderBottomWidth: 1
          }}
        >
          <View
            style={{
              flex: 0.25,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image style={{ height: 75, width: 75 }} source={logo} />
          </View>

          <View
            style={{
              flex: 0.75,
              borderLeftColor: "#DEDEDE",
              borderLeftWidth: 1
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10
              }}
              onPress={() => {
                this.setState({
                  aditionalPanelFirst: !this.state.aditionalPanelFirst,
                  buttonCollapsedFirst: !this.state.buttonCollapsedFirst
                });
              }}
            >
              <View
                style={{
                  flex: 0.4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: 10
                }}
              >
                <Ionicons
                  name="logo-usd"
                  style={{
                    fontSize: 20,
                    color: "#083D77"
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Questrial",
                    color: "#083D77",
                    marginLeft: 10
                  }}
                >
                  {this.formatter(ventas.total)}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.4,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginLeft: 25
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Questrial",
                    marginLeft: 10,
                    color: "#083D77"
                  }}
                >
                  {ventas.variacion}
                </Text>
                <SimpleLineIcons
                  name={this.props.iconoVentas}
                  style={{
                    marginLeft: 13,
                    fontSize: 20,
                    color: this.props.colorVentas
                  }}
                />
              </View>

              <View
                style={{
                  flex: 0.2,
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                {this.state.buttonCollapsedFirst ? (
                  <Ionicons
                    name="ios-arrow-down"
                    style={{
                      fontSize: 20
                    }}
                  />
                ) : (
                  <Ionicons
                    name="ios-arrow-forward"
                    style={{
                      fontSize: 20
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>

            {this.state.aditionalPanelFirst && (
              <Animatable.View
                animation="fadeInRight"
                duration={1000}
                style={{
                  flex: 1,
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

                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 5 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventas.causas.salas_cerradas)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Salas cerradas
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventas.causas.salas_nuevas)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Salas nuevas
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventas.causas.productos_descatalogados)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Productos descatalogados
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventas.causas.productos_nuevos)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Productos nuevos
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventas.causas.mismas_salas)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Mismas salas / Mismos productos
                      </Text>
                    </View>
                  </View>
                </View>
              </Animatable.View>
            )}

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10
              }}
              onPress={() => {
                this.setState({
                  aditionalPanelSecond: !this.state.aditionalPanelSecond,
                  buttonCollapsedSecond: !this.state.buttonCollapsedSecond
                });
              }}
            >
              <View
                style={{
                  flex: 0.4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: 10
                }}
              >
                <Ionicons
                  name="ios-search"
                  style={{
                    fontSize: 20,
                    color: "gray"
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Questrial",
                    color: "gray"
                  }}
                >
                  {this.formatter(ventasPerdidas.total)}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.4,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginLeft: 25
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Questrial",
                    marginLeft: 10,
                    color: "gray"
                  }}
                >
                  {ventasPerdidas.variacion}
                </Text>
                <SimpleLineIcons
                  name={this.props.iconoVentasPerdidas}
                  style={{
                    marginLeft: 13,
                    fontSize: 20,
                    color: this.props.colorVentasPerdidas
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.state.buttonCollapsedSecond ? (
                  <Ionicons
                    name="ios-arrow-down"
                    style={{
                      fontSize: 20
                    }}
                  />
                ) : (
                  /*
                  <Icon
                    name="ios-arrow-down-outline"
                    style={{
                      fontSize: 20
                    }}
                  />
                  */
                  <Ionicons
                    name="ios-arrow-forward"
                    style={{
                      fontSize: 20
                    }}
                  />
                  /*
                  <Icon
                    name="ios-arrow-forward-outline"
                    style={{
                      fontSize: 20
                    }}
                  />
                  */
                )}
              </View>
            </TouchableOpacity>

            {this.state.aditionalPanelSecond && (
              <Animatable.View
                animation="fadeInRight"
                duration={1000}
                style={{
                  flex: 1,
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

                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 5 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventasPerdidas.causas.chequear_pedidos)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Chequear Pedidos
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventasPerdidas.causas.reposicion)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Reposición
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(ventasPerdidas.causas.desajuste_stock)}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Desajuste Stock
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingBottom: 0
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        justifyContent: "center",
                        alignItems: "flex-end"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Questrial"
                        }}
                      >
                        {this.formatter(
                          ventasPerdidas.causas.productos_descatalogados
                        )}
                      </Text>
                    </View>
                    <View style={{ flex: 0.75, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Questrial"
                        }}
                      >
                        Items Descatalogados
                      </Text>
                    </View>
                  </View>
                </View>
              </Animatable.View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default DetailReport;
