import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Thumbnail, Button, Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import { isEmpty, size } from "lodash";
import {
  ScrollView,
  Dimensions,
  DeviceEventEmitter,
  Image,
  TouchableOpacity
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import AssetUtils from "expo-asset-utils";

import {
  LikePublication,
  UnLikePublication
} from "@components/wall/publication/PublicationActions";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const width = Dimensions.get("window").width - 20;
const newPostImage = require("@assets/images/new-post.png");

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
    margin: PropTypes.bool,
    images: PropTypes.oneOfType([PropTypes.any]),
    flagComments: PropTypes.bool,
    newPost: PropTypes.bool
  };

  static defaultProps = {
    id: 0,
    userName: "",
    date: "",
    content: "",
    enableLike: false,
    likes: 0,
    comments: 0,
    margin: false,
    images: [],
    flagComments: false,
    newPost: false
  };

  constructor(props) {
    super(props);

    if (!this.props.flagComments) {
      DeviceEventEmitter.addListener(`publicationEvent-${this.props.id}`, e => {
        if (e.event === "comment") {
          this.setState({
            comments: this.state.comments + 1
          });
        } else if (e.event === "like") {
          this.setState({
            likes: this.state.likes + 1,
            enableLike: false
          });
        } else if (e.event === "unlike") {
          this.setState({
            likes: this.state.likes - 1,
            enableLike: true
          });
        }
      });
    }
  }

  state = {
    loading: false,
    imagesArray: [],
    likes: this.props.likes,
    enableLike: this.props.enableLike,
    comments: this.props.comments
  };

  async componentWillMount() {
    const imagesArray = [];

    if (!isEmpty(this.props.images)) {
      let contador = 0;

      for (const image of this.props.images) {
        contador += 1;

        const asset = await AssetUtils.resolveAsync(image.imagePath);

        imagesArray.push({ uri: asset.localUri, id: contador });
      }

      this.setState({
        imagesArray
      });
    }
  }

  likePublication = () => {
    this.setState({
      loading: true
    });

    this.props.LikePublication(this.props.id).then(() => {
      this.setState({
        loading: false,
        likes: this.state.likes + 1,
        enableLike: false
      });

      if (this.props.flagComments) {
        DeviceEventEmitter.emit(`publicationEvent-${this.props.id}`, {
          event: "like"
        });
      }
    });
  };

  unlikePublication = () => {
    this.setState({
      loading: true
    });

    this.props.UnLikePublication(this.props.id).then(() => {
      this.setState({
        loading: false,
        likes: this.state.likes - 1,
        enableLike: true
      });

      if (this.props.flagComments) {
        DeviceEventEmitter.emit(`publicationEvent-${this.props.id}`, {
          event: "unlike"
        });
      }
    });
  };

  render = () => {
    const { id, userName, date, content, margin, newPost } = this.props;

    const profile = require("@assets/images/profile.png");
    const arrayContent = content.split(" ");

    let contador = 0;
    const temp = arrayContent.map(line => {
      contador += 1;

      if (line[0] === "#") {
        return (
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Questrial",
              color: "#007aff",
              zIndex: 10000
            }}
            key={contador}
            onPress={() => {
              Actions.wallHashtags({ hash: line });
            }}
          >
            {line}{" "}
          </Text>
        );
      }

      return (
        <Text
          key={contador}
          style={{
            fontSize: 12,
            fontFamily: "Questrial"
          }}
        >
          {line}{" "}
        </Text>
      );
    });

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
        {newPost && (
          <Image
            style={{
              position: "absolute",
              height: 62.5,
              width: 100,
              right: 0,
              zIndex: 1000
            }}
            source={newPostImage}
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
                {temp}
              </Text>
            </View>

            {!isEmpty(this.state.imagesArray) && (
              <View
                style={{
                  flex: 1
                }}
              >
                {size(this.state.imagesArray) > 1 && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10
                    }}
                  >
                    <Text
                      style={{
                        color: "#808080",
                        fontSize: 12
                      }}
                    >
                      {size(this.state.imagesArray)} Imagenes
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: size(this.state.imagesArray) === 1 ? 10 : 0
                  }}
                >
                  <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.state.imagesArray.map(image => (
                      <AutoHeightImage
                        width={width}
                        source={{ uri: image.uri }}
                        key={image.id}
                      />
                    ))}
                  </ScrollView>
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
                  {this.state.likes} Me gusta
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    zIndex: 5000
                  }}
                  onPress={() => {
                    Actions.wallComments({ idPost: id });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Questrial",
                      color: "#007aff"
                    }}
                  >
                    {this.state.comments} Comentarios
                  </Text>
                </TouchableOpacity>
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
                {!this.state.enableLike && (
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

                {this.state.enableLike && (
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
                      fontFamily: "Questrial"
                    }}
                  >
                    Comentar
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        {this.state.loading && <LoadingOverlay />}
      </View>
    );
  };
}

const mapDispatchToProps = {
  LikePublication,
  UnLikePublication
};

export default connect(
  null,
  mapDispatchToProps
)(Publication);
