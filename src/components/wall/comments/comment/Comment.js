import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class Comment extends Component {
  static propTypes = {
    subcomment: PropTypes.bool,
    data: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    subcomment: false,
    data: {}
  };

  componentWillMount = () => {};

  render = () => {
    const { data, subcomment } = this.props;
    const subComment = subcomment ? 50 : 10;

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1000}
        style={{
          margin: 10,
          marginLeft: subComment,
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
              Admin
            </Text>
            <Text
              style={{
                fontWeight: "200",
                color: "#808080"
              }}
            >
              {moment(data.date).fromNow()}
            </Text>
            <Text
              style={{
                paddingTop: 10
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
