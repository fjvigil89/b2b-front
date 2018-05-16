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

import CreateReply from "@components/wall/respond_comment/RespondCommentAction";

const deviceHeight = Dimensions.get("window").height;
const platform = Platform.OS;

class RespondComment extends React.Component {
  static propTypes = {
    CreateReply: PropTypes.func.isRequired,
    post: PropTypes.number,
    comment: PropTypes.number
  };

  static defaultProps = {
    post: 0,
    comment: 0
  };

  state = {
    content: ""
  };

  createReply = () => {
    this.props
      .CreateReply(this.props.post, this.props.comment, this.state.content)
      .then(() => {
        Actions.pop();
      });
  };

  changeText = v => {
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
                fontSize: 13,
                color: platform === "android" ? "#FFF" : "#000"
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
                        Juanito Perez
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
                height: deviceHeight - 135
              }}
              alue={this.state.content}
              onChangeText={v => this.changeText(v)}
              placeholder="Escribe tu respuesta..."
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  CreateReply
};

export default connect(null, mapDispatchToProps)(RespondComment);
