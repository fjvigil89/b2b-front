import React, { Component } from "react";
import { Image, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Content, Text, ListItem, Container, Left } from "native-base";
import { Ionicons } from '@expo/vector-icons';

import { Logout } from "@components/login/LoginActions";

const logo = require("@assets/images/logo-cademsmart.png");
const backgroundImage = require("@assets/images/background_app_cademsmart-v2.png");

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

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
    Actions.pollsList();
  };

  report = () => {
    Actions.report();
  };

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <View
            style={{
              alignSelf: "stretch",
              height: 200,
              width: null,
              position: "relative",
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                position: "absolute",
                width: 700,
                height: 200,
                top: 0,
                zIndex: 100,
                opacity: 0.7
              }}
              source={backgroundImage}
            />
            <Image
              source={logo}
              style={{
                zIndex: 150
              }}
            />
            <Text
              style={{
                fontFamily: "Bree",
                fontSize: 16,
                color: "#000",
                zIndex: 200
              }}
            >
              SMARTapp
            </Text>
          </View>
          <ListItem button noBorder onPress={this.report}>
            <Left>
              <Ionicons
                active
                name="ios-images"
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
                Dashboard
              </Text>
            </Left>
          </ListItem>
          <ListItem button noBorder onPress={this.dashboard}>
            <Left>
              <Ionicons
                active
                name="ios-barcode"
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
                Salas
              </Text>
            </Left>
          </ListItem>

          <ListItem button noBorder onPress={this.maps}>
            <Left>
              <Ionicons
                active
                name="ios-navigate"
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

          <ListItem button noBorder onPress={this.wall}>
            <Left>
              <Ionicons
                active
                name="ios-chatboxes"
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

          <ListItem button noBorder onPress={this.polls}>
            <Left>
              <Ionicons
                active
                name="ios-list-box"
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
              <Ionicons
                active
                name="ios-exit"
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
          <View
            style={{
              flexDirection: 'row',
              height: 200,
              width: null,
              justifyContent: "flex-start",
              alignItems: "flex-end",
              marginLeft: 20
            }}
          >
            <Ionicons
              active
              name="md-person"
              style={{ fontSize: 24, width: 30 }}
            />
            <Text
              style={{
                fontFamily: "Bree",
                fontSize: 12,
                color: "#000",
                marginRight: 20,
              }}
            >
              {this.props.user}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  user: state.user.user
});

const mapDispatchToProps = {
  Logout
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
