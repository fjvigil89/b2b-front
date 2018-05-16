import React from "react";
import { View, StatusBar, Dimensions, Platform } from "react-native";
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
  Icon
} from "native-base";
import { Actions } from "react-native-router-flux";

import CreatePost from "@components/wall/create_publication/CreatePublicationActions";

const deviceHeight = Dimensions.get("window").height;
const platform = Platform.OS;

class CreatePublication extends React.Component {
  static propTypes = {
    CreatePost: PropTypes.func.isRequired,
    user: PropTypes.string
  };
  static defaultProps = {
    user: ""
  };

  state = {
    content: ""
  };

  createPost = () => {
    this.props.CreatePost(this.state.content).then(() => {
      Actions.pop();
    });
  };

  changeInputLogin = v => {
    this.setState({
      content: v
    });
  };

  render() {
    const profile = require("@assets/images/profile.png");

    return (
      <Container style={{ backgroundColor: "#F4F4F4" }}>
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
        <Content scrollEnabled={false} enableAutoAutomaticScroll={false}>
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
                height: deviceHeight - 230
              }}
              value={this.state.content}
              onChangeText={v => this.changeInputLogin(v)}
              placeholder="Escribe lo que piensas..."
            />

            <Button iconLeft info full large bordered style={{ marginTop: 5 }}>
              <Icon style={{ fontSize: 50 }} name="ios-camera-outline" />
              <Text>Imagen</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = {
  CreatePost
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePublication);
