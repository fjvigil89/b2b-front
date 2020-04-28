import React from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Platform,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { size, isEmpty, filter, take } from 'lodash';

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
  ListItem,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import CreateReply from '@components/wall/respond_comment/RespondCommentAction';
import { GetHashtags } from '@components/wall/WallActions';
import LoadingOverlay from '@common/loading_overlay/LoadingOverlay';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const platform = Platform.OS;

class RespondComment extends React.Component {
  static propTypes = {
    CreateReply: PropTypes.func.isRequired,
    GetHashtags: PropTypes.func.isRequired,
    hashtags: PropTypes.oneOfType([PropTypes.any]),
    user: PropTypes.string,
    post: PropTypes.number,
    comment: PropTypes.number,
    endpoint: PropTypes.string,
  };

  static defaultProps = {
    hashtags: [],
    user: '',
    post: 0,
    comment: 0,
    endpoint: '',
  };

  constructor() {
    super();

    this.previousChar = ' ';
    this.isTrackingStarted = false;
  }

  state = {
    content: '',
    images: [],
    loading: false,
    buttonDisabled: false,
    showHashtag: false,
    hashtags: [],
    inputHashtag: '',
    auxText: '',
  };

  async componentWillMount() {
    await this.props.GetHashtags(this.props.endpoint);
  }

  createReply = () => {
    this.setState({
      loading: true,
    });

    this.props
      .CreateReply(
        this.props.endpoint,
        this.props.post,
        this.props.comment,
        this.state.content,
        this.state.images
      )
      .then(() => {
        this.setState({
          loading: false,
        });

        Actions.pop();
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });

        Alert.alert('Error', err.message);
      });
  };

  pickPhoto = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const permissionsCamera = Permissions.CAMERA;

    const gallery = await Permissions.askAsync(permissions);
    const camera = await Permissions.askAsync(permissionsCamera);

    if (gallery.status === 'granted' && camera.status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        const tempImages = this.state.images;
        const nextId = size(tempImages);

        tempImages.push({ uri: result.uri, id: nextId + 1 });

        this.setState({
          buttonDisabled: true,
        });

        this.setState({ images: tempImages });
      }
    } else {
      Alert.alert(
        'Acceso denegado',
        'Habilita el acceso a la Camara en la configuración de tu dispositivo.'
      );
    }
  };

  changeText = (v) => {
    this.setState({
      content: v,
    });

    const lastChar = v.substr(v.length - 1);

    const previousMustBeSpace = this.previousChar.trim().length === 0;

    if (lastChar === '#' && previousMustBeSpace) {
      this.startTracking(v);
      return;
    } else if ((lastChar === ' ' && this.isTrackingStarted) || v === '') {
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
      inputHashtag: v,
    });
  }

  stopTracking() {
    this.isTrackingStarted = false;

    this.setState({
      showHashtag: false,
      hashtags: [],
      inputHashtag: '',
      auxText: '',
    });
  }

  identifyKeyword(content) {
    const sizeAuxContent = size(this.state.inputHashtag);

    const val = content.slice(sizeAuxContent);

    const validHashtags = take(
      filter(this.props.hashtags, (hash) => {
        if (hash.text.match(new RegExp(`^#${val}`, 'gi'))) {
          return true;
        }
        return false;
      }),
      5
    );

    this.setState({
      hashtags: validHashtags,
      auxText: val,
    });
  }

  autocompleteHashtag(hashtagSelected) {
    const sizeInputHashtag = size(this.state.auxText);

    const differenceHastagSelected = hashtagSelected.slice(
      sizeInputHashtag + 1
    );

    this.stopTracking();

    this.previousChar = ' ';

    this.setState({
      content: `${this.state.content}${differenceHastagSelected} `,
    });
  }

  render() {
    const profile = require('@assets/images/profile.png');

    return (
      <Container style={{ backgroundColor: '#FFFFFF' }}>
        <StatusBar barStyle="dark-content" />
        <Header
          style={{
            borderBottomWidth: 0,
            backgroundColor: platform === 'android' ? '#083D77' : '#F4F4F4',
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
              {platform === 'android' && (
                <Ionicons
                  name="md-arrow-back"
                  style={{ fontSize: 24, color: '#FFFFFF' }}
                />
              )}
              {platform === 'ios' && (
                <Text style={{ fontSize: 14 }}>Cancelar</Text>
              )}
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                fontSize: 13,
                color: platform === 'android' ? '#FFF' : '#000',
              }}
            >
              RESPONDER COMENTARIO
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={this.createReply}>
              <Text style={{ fontSize: 13 }}>Respuesta</Text>
            </Button>
          </Right>
        </Header>
        <Content enableAutoAutomaticScroll={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
            }}
          >
            <View
              style={{
                margin: 0,
                padding: 0,
                flex: 1,
                backgroundColor: 'transparent',
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: 10,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                  >
                    <View
                      style={{
                        flex: 0.1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Thumbnail small source={profile} />
                    </View>
                    <View
                      style={{
                        flex: 0.9,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: 'Questrial',
                          fontWeight: 'bold',
                        }}
                      >
                        {this.props.user}
                      </Text>
                      <Text
                        style={{
                          color: '#808080',
                          fontSize: 12,
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
                height: 100,
              }}
              value={this.state.content}
              onChangeText={(v) => this.changeText(v)}
              placeholder="Escribe tu respuesta..."
            />

            {this.state.showHashtag && (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <List
                  dataArray={this.state.hashtags}
                  renderRow={(item) => (
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
                flexDirection: 'row',
              }}
            >
              <Button
                iconLeft
                info
                full
                bordered
                disabled={this.state.buttonDisabled}
                style={{ flex: 1, marginTop: 5 }}
                onPress={this.pickPhoto}
              >
                <Ionicons
                  name="ios-camera"
                  style={{
                    color: '',
                    fontSize: 30,
                  }}
                />
                <Text>Tomar foto</Text>
              </Button>
              {/*
              <Button
                iconLeft
                info
                full
                bordered
                disabled={this.state.buttonDisabled}
                style={{ flex: 0.5, marginTop: 5 }}
                onPress={this.pickImage}
              >
                <Icon style={{ fontSize: 30 }} name="ios-image-outline" />
                <Text>Subir imagen</Text>
              </Button>
              */}
            </View>

            {!isEmpty(this.state.images) && (
              <View
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: '#808080',
                      fontSize: 12,
                    }}
                  >
                    1 Imagen para cargar
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                  >
                    <Image
                      style={{
                        width,
                        height: 250,
                      }}
                      source={{ uri: this.state.images[0].uri }}
                    />
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

const mapStateToProps = (state) => ({
  user: state.user.user,
  hashtags: state.wall.hashtags,
  endpoint: state.user.endpoint,
});

const mapDispatchToProps = {
  CreateReply,
  GetHashtags,
};

export default connect(mapStateToProps, mapDispatchToProps)(RespondComment);
