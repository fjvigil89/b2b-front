import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

class Comment extends Component {
  static propTypes = {
    subcomment: PropTypes.bool
  };

  static defaultProps = {
    subcomment: false
  };

  componentWillMount = () => {};

  render = () => {
    const subcomment = this.props.subcomment ? 50 : 10;

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1000}
        style={{
          margin: 10,
          marginLeft: subcomment,
          marginTop: 0,
          marginBottom: 5,
          padding: 0,
          flex: 1,
          backgroundColor: "transparent",
          borderBottomColor: "#DEDEDE",
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 10,
              backgroundColor: "#FFF",
              borderRadius: 10
            }}
          >
            <Text
              style={{
                fontSize: 17
              }}
            >
              Esteban Paredes
            </Text>
            <Text
              style={{
                fontWeight: "200",
                color: "#808080"
              }}
            >
              Hace 2 horas
            </Text>
            <Text
              style={{
                paddingTop: 10
              }}
            >
              Hola Juanito Perez, te he venido a saludas, que estes muy bien...
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 15
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
                    fontSize: 13,
                    fontFamily: "Questrial",
                    color: "#007aff"
                  }}
                >
                  12 Me gustas
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
                    fontSize: 13,
                    fontFamily: "Questrial",
                    color: "#007aff"
                  }}
                >
                  Comentar
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animatable.View>
    );
  };
}

export default Comment;
