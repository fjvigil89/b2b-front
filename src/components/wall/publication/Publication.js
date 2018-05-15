import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Thumbnail, Button, Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import {
  LikePublication,
  UnLikePublication
} from "@components/wall/publication/PublicationActions";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class Publication extends Component {
  static propTypes = {
    LikePublication: PropTypes.func.isRequired,
    UnLikePublication: PropTypes.func.isRequired,
    id: PropTypes.number,
    userName: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    enableLike: PropTypes.bool,
    likes: PropTypes.number,
    comments: PropTypes.number,
    margin: PropTypes.bool
  };

  static defaultProps = {
    id: 0,
    userName: "",
    date: "",
    content: "",
    enableLike: false,
    likes: 0,
    comments: 0,
    margin: false
  };

  likePublication = () => {
    this.props.LikePublication(this.props.id);
  };

  unlikePublication = () => {
    this.props.UnLikePublication(this.props.id);
  };

  render = () => {
    const {
      id,
      userName,
      date,
      content,
      enableLike,
      likes,
      comments,
      margin
    } = this.props;

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
          borderBottomColor: "#F0F0F0",
          borderBottomWidth: 1,
          marginBottom: margin ? 10 : 0
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
              paddingBottom: 0,
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
                  {userName}
                </Text>
                <Text
                  style={{
                    color: "#808080",
                    fontSize: 12
                  }}
                >
                  {moment(date).fromNow()}
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
                {content}
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
                  {likes} Me gusta
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
                    if (comments > 0) {
                      Actions.wallComments({ idPost: id });
                    }
                  }}
                >
                  {comments} Comentarios
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {!enableLike && (
                  <Button
                    iconLeft
                    transparent
                    full
                    onPress={() => {
                      this.unlikePublication();
                    }}
                  >
                    <Icon color="#B2B2B2" name="ios-thumbs-up" />
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "Questrial"
                      }}
                    >
                      Me gusta
                    </Text>
                  </Button>
                )}

                {enableLike && (
                  <Button
                    iconLeft
                    transparent
                    full
                    onPress={() => {
                      this.likePublication();
                    }}
                  >
                    <Icon name="ios-thumbs-up-outline" />
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: "Questrial"
                      }}
                    >
                      Me gusta
                    </Text>
                  </Button>
                )}
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button
                  iconLeft
                  transparent
                  full
                  onPress={() => {
                    Actions.commentPublication({ post: id });
                  }}
                >
                  <Icon name="ios-text-outline" />
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Questrial",
                    }}
                  >
                    Comentar
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
}

const mapDispatchToProps = {
  LikePublication,
  UnLikePublication
};

export default connect(null, mapDispatchToProps)(Publication);
