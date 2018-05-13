import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import { Text, View } from "native-base";
import { Actions } from "react-native-router-flux";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class Comment extends Component {
  static propTypes = {
    subcomment: PropTypes.bool,
    id: PropTypes.number,
    userName: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    enableLike: PropTypes.bool,
    likes: PropTypes.number,
    comments: PropTypes.number,
    delay: PropTypes.number
  };

  static defaultProps = {
    subcomment: false,
    id: 0,
    userName: "",
    date: "",
    content: "",
    enableLike: false,
    likes: 0,
    comments: 0,
    delay: 0
  };

  componentWillMount = () => {};

  render = () => {
    const {
      id,
      userName,
      date,
      content,
      enableLike,
      likes,
      comments,
      subcomment
    } = this.props;
    const subComment = subcomment ? 50 : 0;

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1000}
        delay={this.props.delay}
        style={{
          margin: 0,
          marginLeft: subComment,
          marginTop: 0,
          marginBottom: 5,
          padding: 0,
          flex: 1
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
              {userName}
            </Text>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 12,
                fontFamily: "Questrial"
              }}
            >
              {content}
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
                  flex: 1,
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
                  {likes} Me gusta
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#F4F4F4",
            marginBottom: 10
          }}
        >
          <View
            style={{
              flex: 0.4,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingTop: 5,
              paddingLeft: 10,
              paddingBottom: 5
            }}
          >
            <Text
              style={{
                color: "#808080",
                fontSize: 12
              }}
            >
              {moment(date).fromNow()}
            </Text>
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 5,
              right: 90
            }}
          >
            <Text
              style={{
                fontSize: 12
              }}
            >
              Me gusta
            </Text>
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 5,
              right: 10
            }}
          >
            <Text
              style={{
                fontSize: 12
              }}
              onPress={() => {
                Actions.respondComment();
              }}
            >
              Responder
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  };
}

export default Comment;
