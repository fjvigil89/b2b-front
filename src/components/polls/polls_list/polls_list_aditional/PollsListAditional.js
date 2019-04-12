import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import * as Animatable from "react-native-animatable";
import { Actions } from "react-native-router-flux";
import {Ionicons} from "@expo/vector-icons";

class PollsListAditional extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.any]),
    paramsPoll: PropTypes.string
  };

  static defaultProps = {
    data: [],
    paramsPoll: ""
  };

  getContent = data => {
    if (data.state === "complete") {
      return this.getContentNotAvailable(data, {
        color: "blue",
        status: "Completado"
      });
    } else if (data.state === "notAvailable") {
      return this.getContentNotAvailable(data, {
        color: "red",
        status: "No disponible"
      });
    } else if (data.state === "expired") {
      return this.getContentNotAvailable(data, {
        color: "#9A7D0A",
        status: "Expirado"
      });
    }

    return this.getContentAvailable(data);
  };

  getContentNotAvailable = (data, params) => (
    <TouchableOpacity style={{ flex: 1 }}>
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
              flex: 0.8,
              flexDirection: "column"
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 13,
                fontFamily: "Questrial",
                color: params.color
              }}
            >
              {params.status}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                fontFamily: "Questrial",
                fontWeight: "bold",
                marginTop: 5
              }}
            >
              {data.title}
            </Text>
            <Text
              note
              style={{
                flex: 1,
                fontSize: 12,
                fontFamily: "Questrial",
                marginTop: 5
              }}
            >
              {data.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  getContentAvailable = data => (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => {
        Actions.polls({
          idPoll: data.idPoll,
          paramsPoll: this.props.paramsPoll
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
              flex: 0.8,
              flexDirection: "column"
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 13,
                fontFamily: "Questrial",
                color: "green"
              }}
            >
              Disponible
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                fontFamily: "Questrial",
                fontWeight: "bold",
                marginTop: 5
              }}
            >
              {data.title}
            </Text>
            <Text
              note
              style={{
                flex: 1,
                fontSize: 12,
                fontFamily: "Questrial",
                marginTop: 5
              }}
            >
              {data.description}
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
  );

  render() {
    const backgroundImage = require("@assets/images/background-detalle-sala-categoria.png");

    let iterator = 0;
    const categoryDetailSala = this.props.data.listPolls.map(data => {
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
          {this.getContent(data)}
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
            Listado de Encuestas
          </Text>
        </View>
        {categoryDetailSala}
      </View>
    );
  }
}

export default PollsListAditional;
