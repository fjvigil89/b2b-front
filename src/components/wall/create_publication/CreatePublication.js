import React from "react";
import {
  View,
  StatusBar,
  Dimensions,
  Platform,
  Alert,
  Image,
  ScrollView,
  DeviceEventEmitter
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Text,
  Content,
  Left,
  Body,
  Title,
  Right,
  Header,
  Textarea,
  Thumbnail,
  Icon,
  List,
  ListItem
} from "native-base";
import { Actions } from "react-native-router-flux";
import { ImagePicker, Permissions } from "expo";
import { size, filter, take } from "lodash";

import CreatePost from "@components/wall/create_publication/CreatePublicationActions";
import { GetHashtags } from "@components/wall/WallActions";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

const platform = Platform.OS;
const { width } = Dimensions.get("window");

class CreatePublication extends React.Component {
  static propTypes = {
    CreatePost: PropTypes.func.isRequired,
    GetHashtags: PropTypes.func.isRequired,
    hashtags: PropTypes.oneOfType([PropTypes.any]),
    user: PropTypes.string
  };
  static defaultProps = {
    hashtags: [],
    user: ""
  };

  constructor() {
    super();

    this.previousChar = " ";
    this.isTrackingStarted = false;
  }

  state = {
    content: "",
    images: [],
    loading: false,
    showHashtag: false,
    hashtags: [],
    inputHashtag: "",
    auxText: ""
  };

  async componentWillMount() {
    await this.props.GetHashtags();
  }

  createPost = () => {
    this.setState({
      loading: true
    });

    this.props
      .CreatePost(this.state.content, this.state.images, this.props.user)
      .then(() => {
        this.setState({
          loading: false
        });

        Actions.pop();

        setTimeout(() => {
          Alert.alert("Exito", "La Publicación ha sido creada.", [
            {
              text: "Ver Publicación",
              onPress: () => {
                DeviceEventEmitter.emit(`wallEvent`, {});
              }
            },
            { text: "Cancelar", style: "cancel" }
          ]);
        }, 500);
      })
      .catch(err => {
        this.setState({
          loading: false
        });

        Alert.alert("Error", err.message);
      });
  };

  changeInputLogin = v => {
    this.setState({
      content: v
    });

    const lastChar = v.substr(v.length - 1);

    const previousMustBeSpace = this.previousChar.trim().length === 0;

    if (lastChar === "#" && previousMustBeSpace) {
      this.startTracking(v);
      return;
    } else if ((lastChar === " " && this.isTrackingStarted) || v === "") {
      this.stopTracking();
    }

    this.previousChar = lastChar;

    if (this.isTrackingStarted) {
      this.identifyKeyword(v);
    }
  };

  startTracking(v) {
    this.isTrackingStarted = true;

    this.setState({
      showHashtag: true,
      inputHashtag: v
    });
  }

  stopTracking() {
    this.isTrackingStarted = false;

    this.setState({
      showHashtag: false,
      hashtags: [],
      inputHashtag: "",
      auxText: ""
    });
  }

  identifyKeyword(content) {
    const sizeAuxContent = size(this.state.inputHashtag);

    const val = content.slice(sizeAuxContent);

    const validHashtags = take(
      filter(this.props.hashtags, hash => {
        if (hash.text.match(new RegExp(`^#${val}`, "gi"))) {
          return true;
        }
        return false;
      }),
      5
    );

    this.setState({
      hashtags: validHashtags,
      auxText: val
    });
  }

  autocompleteHashtag(hashtagSelected) {
    const sizeInputHashtag = size(this.state.auxText);

    const differenceHastagSelected = hashtagSelected.slice(
      sizeInputHashtag + 1
    );

    this.stopTracking();

    this.previousChar = " ";

    this.setState({
      content: `${this.state.content}${differenceHastagSelected} `
    });
  }

  pickImage = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      if (!result.cancelled) {
        const tempImages = this.state.images;
        const nextId = size(tempImages);

        tempImages.push({ uri: result.uri, id: nextId + 1 });

        this.setState({ images: tempImages });
      }
    } else {
      Alert.alert(
        "Acceso denegado",
        "Habilita el acceso a la Camara en la configuración de tu dispositivo."
      );
    }
  };

  pickPhoto = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const permissionsCamera = Permissions.CAMERA;

    const gallery = await Permissions.askAsync(permissions);
    const camera = await Permissions.askAsync(permissionsCamera);

    if (gallery.status === "granted" && camera.status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        const tempImages = this.state.images;
        const nextId = size(tempImages);

        tempImages.push({ uri: result.uri, id: nextId + 1 });

        this.setState({ images: tempImages });
      }
    } else {
      Alert.alert(
        "Acceso denegado",
        "Habilita el acceso a la Camara en la configuración de tu dispositivo."
      );
    }
  };

  render() {
    const profile = require("@assets/images/profile.png");

    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <StatusBar barStyle="dark-content" />
        <Header
          style={{
            borderBottomWidth: 0,
            backgroundColor: platform === "android" ? "#083D77" : "#F4F4F4"
          }}
          iosBarStyle="dark-content"
        >
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              {platform === "android" && (
                <Icon name="md-arrow-back" color="#B2B2B2" />
              )}
              {platform === "ios" && (
                <Text style={{ fontSize: 14 }}>Cancelar</Text>
              )}
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                fontSize: 14,
                color: platform === "android" ? "#FFF" : "#000"
              }}
            >
              CREAR PUBLICACION
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={this.createPost}>
              <Text style={{ fontSize: 14 }}>Publicar</Text>
            </Button>
          </Right>
        </Header>

        {/* 
          Para que cuando se abra el teclado no suba el scroll
          <Content scrollEnabled={false} enableAutoAutomaticScroll={false}>
        */}
        <Content enableAutoAutomaticScroll={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF"
            }}
          >
            <View
              style={{
                margin: 0,
                padding: 0,
                flex: 1,
                backgroundColor: "transparent",
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
                        {this.props.user}
                      </Text>
                      <Text
                        style={{
                          color: "#808080",
                          fontSize: 12
                        }}
                      >
                        dice...
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <Textarea
              style={{
                fontSize: 18,
                height: 100
              }}
              value={this.state.content}
              onChangeText={v => this.changeInputLogin(v)}
              placeholder="Escribe lo que piensas..."
            />

            {this.state.showHashtag && (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <List
                  dataArray={this.state.hashtags}
                  renderRow={item => (
                    <ListItem
                      onPress={() => {
                        this.autocompleteHashtag(item.text);
                      }}
                    >
                      <Text>{item.text}</Text>
                    </ListItem>
                  )}
                />
              </View>
            )}

            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <Button
                iconLeft
                info
                full
                bordered
                style={{ flex: 1, marginTop: 5 }}
                onPress={this.pickPhoto}
              >
                <Icon style={{ fontSize: 30 }} name="ios-camera-outline" />
                <Text>Tomar foto</Text>
              </Button>
              {/*
              <Button
                iconLeft
                info
                full
                bordered
                style={{ flex: 0.5, marginTop: 5 }}
                onPress={this.pickImage}
              >
                <Icon style={{ fontSize: 30 }} name="ios-image-outline" />
                <Text>Subir imagen</Text>
              </Button>
              */}
            </View>

            {size(this.state.images) > 0 && (
              <View
                style={{
                  flex: 1
                }}
              >
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
                    {size(this.state.images) === 1 && "1 Imagen para cargar"}
                    {size(this.state.images) > 1 &&
                      `${size(this.state.images)} Imagenes para cargar`}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                  >
                    {size(this.state.images) === 1 && (
                      <Image
                        style={{
                          width,
                          height: 250
                        }}
                        source={{ uri: this.state.images[0].uri }}
                      />
                    )}

                    {size(this.state.images) > 1 &&
                      this.state.images.map(image => (
                        <Image
                          style={{
                            width: 200,
                            height: 250
                          }}
                          source={{ uri: image.uri }}
                          key={image.id}
                        />
                      ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </View>
        </Content>
        {this.state.loading && <LoadingOverlay />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  hashtags: state.wall.hashtags
});

const mapDispatchToProps = {
  CreatePost,
  GetHashtags
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePublication);
