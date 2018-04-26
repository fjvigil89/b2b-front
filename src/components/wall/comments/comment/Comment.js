import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class Comment extends Component {
  static propTypes = {
    subcomment: PropTypes.bool,
    data: PropTypes.oneOfType([PropTypes.any]),
    delay: PropTypes.number
  };

  static defaultProps = {
    subcomment: false,
    data: {},
    delay: 0
  };

  componentWillMount = () => {};

  render = () => {
    const { data, subcomment } = this.props;
    const subComment = subcomment ? 50 : 10;

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1000}
        delay={this.props.delay}
        style={{
          margin: 10,
          marginLeft: subComment,
          marginTop: 0,
          marginBottom: 5,
          padding: 0,
          flex: 1,
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
                fontSize: 17,
                fontFamily: "Questrial",
                fontWeight: "bold"
              }}
            >
              Admin
            </Text>
            <Text
              style={{
                color: "#808080",
                fontSize: 12
              }}
            >
              {moment(data.date).fromNow()}
            </Text>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 12,
                fontFamily: "Questrial"
              }}
            >
              {data.content}
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
                    fontSize: 12,
                    fontFamily: "Questrial",
                    color: "#007aff"
                  }}
                >
                  12 Me gusta
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Questrial",
                    color: "#007aff"
                  }}
                >
                  Responder
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
                    fontFamily: "Questrial",
                    color: "#007aff"
                  }}
                >
                  14 Respuestas
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
