import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { Text, View } from "native-base";
import { Actions } from "react-native-router-flux";
import { isEmpty } from "lodash";
import { Dimensions } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

import {
  LikeComment,
  UnLikeComment,
  LikeReply,
  UnLikeReply
} from "@components/wall/comments/comment/CommentAction.js";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const width = Dimensions.get("window").width - 20;

class Comment extends Component {
  static propTypes = {
    LikeComment: PropTypes.func.isRequired,
    UnLikeComment: PropTypes.func.isRequired,
    LikeReply: PropTypes.func.isRequired,
    UnLikeReply: PropTypes.func.isRequired,
    idPost: PropTypes.number,
    subcomment: PropTypes.bool,
    id: PropTypes.number,
    userName: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    enableLike: PropTypes.bool,
    likes: PropTypes.number,
    delay: PropTypes.number,
    image: PropTypes.string,
    endpoint: PropTypes.string
  };

  static defaultProps = {
    idPost: 0,
    subcomment: false,
    id: 0,
    userName: "",
    date: "",
    content: "",
    enableLike: false,
    likes: 0,
    delay: 0,
    image: "",
    endpoint: ""
  };

  state = {
    loading: false
  };

  likeComment = () => {
    this.setState({
      loading: true
    });

    this.props
      .LikeComment(this.props.endpoint, this.props.idPost, this.props.id)
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  unlikeComment = () => {
    this.setState({
      loading: true
    });

    this.props
      .UnLikeComment(this.props.endpoint, this.props.idPost, this.props.id)
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  likeReply = () => {
    this.setState({
      loading: true
    });

    this.props
      .LikeReply(this.props.endpoint, this.props.idPost, this.props.id)
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  unlikeReply = () => {
    this.setState({
      loading: true
    });

    this.props
      .UnLikeReply(this.props.endpoint, this.props.idPost, this.props.id)
      .then(() => {
        this.setState({
          loading: false
        });
      });
  };

  render = () => {
    const {
      idPost,
      id,
      userName,
      date,
      content,
      enableLike,
      likes,
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

            {!isEmpty(this.props.image) && (
              <View
                style={{
                  flex: 1
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 5
                  }}
                >
                  <AutoHeightImage
                    width={subcomment ? width - 50 : width}
                    source={{ uri: this.props.image }}
                  />
                </View>
              </View>
            )}

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
              {moment(date)
                .add()
                .fromNow()}
            </Text>
          </View>

          {enableLike && (
            <View
              style={{
                position: "absolute",
                bottom: 5,
                right: !subcomment ? 90 : 10
              }}
            >
              <Text
                style={{
                  fontSize: 12
                }}
                onPress={() => {
                  if (!subcomment) this.likeComment();
                  else this.likeReply();
                }}
              >
                Me gusta
              </Text>
            </View>
          )}

          {!enableLike && (
            <View
              style={{
                position: "absolute",
                bottom: 5,
                right: !subcomment ? 90 : 10
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#B2B2B2"
                }}
                onPress={() => {
                  if (!subcomment) this.unlikeComment();
                  else this.unlikeReply();
                }}
              >
                Me gusta
              </Text>
            </View>
          )}

          {!subcomment && (
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
                  Actions.respondComment({ post: idPost, comment: id });
                }}
              >
                Responder
              </Text>
            </View>
          )}
        </View>
        {this.state.loading && <LoadingOverlay />}
      </Animatable.View>
    );
  };
}

const mapStateToProps = state => ({
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  LikeComment,
  UnLikeComment,
  LikeReply,
  UnLikeReply
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
