import React from "react";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import { Image, View, TouchableOpacity } from "react-native";
import { Thumbnail, Text } from "native-base";
import { Actions } from "react-native-router-flux";

import _ from "lodash";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class SalasDetail extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      bandera: PropTypes.string,
      date_b2b: PropTypes.string,
      mide: PropTypes.number,
      realizada: PropTypes.number,
      fecha_visita: PropTypes.string,
      direccion: PropTypes.string,
      cod_local: PropTypes.string,
      descripcion: PropTypes.string
    }),
    delay: PropTypes.number
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
      descripcion: ""
    },
    delay: 100
  };

  render() {
    let logo = "";
    let imagen = null;
    let fecha = "";

    if (this.props.data.bandera === "JUMBO") {
      logo = require("@assets/images/jumbo.png");
    } else if (
      this.props.data.bandera === "LIDER EXPRESS" ||
      this.props.data.bandera === "LIDER"
    ) {
      logo = require("@assets/images/lider.png");
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
      logo = require("@assets/images/alvi.png");
    }

    if (this.props.data.mide === 1 && this.props.data.realizada === 1) {
      imagen = require("@assets/images/visita-realizada.png");

      fecha = moment(this.props.data.fecha_visita).fromNow();
    } else if (this.props.data.mide === 1 && this.props.data.realizada === 0) {
      imagen = require("@assets/images/pendiente-visita.png");
    }

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
        <TouchableOpacity
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
                {moment(this.props.data.date_b2b).fromNow()}
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
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

export default SalasDetail;
