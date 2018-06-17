import React, { Component } from "react";
import { Image, Dimensions, Platform, View } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Content, Text, ListItem, Icon, Container, Left } from "native-base";

import { Logout } from "@components/login/LoginActions";

const drawerCover = require("@assets/images/background-sidebar.png");

class SideBar extends Component {
  static propTypes = {
    Logout: PropTypes.func.isRequired
  };

  close = () => {
    Actions.drawerClose();
    this.props.Logout();
  };

  wall = () => {
    Actions.wall();
  };

  dashboard = () => {
    Actions.dashboard();
  };

  maps = () => {
    Actions.maps();
  };

  polls = () => {
    Actions.polls();
  };

  render() {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image
            source={drawerCover}
            style={{
              alignSelf: "stretch",
              height: deviceHeight / 3.5,
              width: null,
              position: "relative",
              marginBottom: 10
            }}
          />
          <View
            style={{
              position: "absolute",
              left:
                Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
              top:
                Platform.OS === "android"
                  ? deviceHeight / 13
                  : deviceHeight / 12,
              width: 210,
              height: 75,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Bree",
                fontWeight: "500",
                fontSize: 36,
                color: "#FFF"
              }}
            >
              CademSmart
            </Text>
            <Text
              style={{
                fontFamily: "Questrial",
                fontWeight: "500",
                fontSize: 16,
                color: "#FFF"
              }}
            >
              SmartB2B
            </Text>
          </View>
          <ListItem button noBorder onPress={this.dashboard}>
            <Left>
              <Icon
                active
                name="ios-barcode-outline"
                style={{ fontSize: 26, width: 30 }}
              />
              <Text
                style={{
                  fontFamily: "Questrial",
                  fontWeight: "500",
                  fontSize: 16,
                  marginLeft: 20
                }}
              >
                Inicio
              </Text>
            </Left>
          </ListItem>
          <ListItem button noBorder onPress={this.wall}>
            <Left>
              <Icon
                active
                name="ios-chatboxes-outline"
                style={{ fontSize: 26, width: 30 }}
              />
              <Text
                style={{
                  fontFamily: "Questrial",
                  fontWeight: "500",
                  fontSize: 16,
                  marginLeft: 20
                }}
              >
                Muro
              </Text>
            </Left>
          </ListItem>
          <ListItem button noBorder onPress={this.maps}>
            <Left>
              <Icon
                active
                name="ios-navigate-outline"
                style={{ fontSize: 26, width: 30 }}
              />
              <Text
                style={{
                  fontFamily: "Questrial",
                  fontWeight: "500",
                  fontSize: 16,
                  marginLeft: 20
                }}
              >
                Mapa
              </Text>
            </Left>
          </ListItem>
          <ListItem button noBorder onPress={this.polls}>
            <Left>
              <Icon
                active
                name="ios-list-box-outline"
                style={{ fontSize: 26, width: 30 }}
              />
              <Text
                style={{
                  fontFamily: "Questrial",
                  fontWeight: "500",
                  fontSize: 16,
                  marginLeft: 20
                }}
              >
                Encuestas
              </Text>
            </Left>
          </ListItem>
          <ListItem button noBorder onPress={this.close}>
            <Left>
              <Icon
                active
                name="ios-exit-outline"
                style={{ fontSize: 26, width: 30 }}
              />
              <Text
                style={{
                  fontFamily: "Questrial",
                  fontWeight: "500",
                  fontSize: 16,
                  marginLeft: 20
                }}
              >
                Cerrar Sesión
              </Text>
            </Left>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  Logout
};

export default connect(
  null,
  mapDispatchToProps
)(SideBar);
