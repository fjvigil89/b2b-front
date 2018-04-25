import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Thumbnail } from "native-base";
import { Actions } from "react-native-router-flux";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class Publication extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    data: {}
  };

  render = () => {
    const { data } = this.props;
    const profile = require("@assets/images/profile.png");

    return (
      <View
        animation="fadeInRight"
        duration={1000}
        style={{
          margin: 0,
          padding: 0,
          flex: 1,
          backgroundColor: "transparent",
          borderBottomColor: "#DEDEDE",
          borderBottomWidth: 1,
          marginBottom: 5
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
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <View
                style={{
                  flex: 0.1,
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Thumbnail small source={profile} />
              </View>
              <View
                style={{
                  flex: 0.9,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "Questrial",
                    fontWeight: "bold"
                  }}
                >
                  {data.userName}
                </Text>
                <Text
                  style={{
                    color: "#808080",
                    fontSize: 12
                  }}
                >
                  {moment(data.date).fromNow()}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 12,
                  fontFamily: "Questrial"
                }}
              >
                {data.content}
              </Text>
            </View>

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
                  {data.totalLikes} Me gusta
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
                  onPress={() => {
                    if (data.totalComments > 0) {
                      Actions.wallComments({ idComment: data.id, data });
                    }
                  }}
                >
                  {data.totalComments} Comentarios
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
}

export default Publication;
