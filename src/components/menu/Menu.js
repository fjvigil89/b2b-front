import React, { Component } from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Content, Text, ListItem, Icon, Container, Left } from "native-base";

import { Logout } from "@components/login/LoginActions";

const logo = require("@assets/images/logo-cademsmart.png");

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
            <Image source={logo} />
            <Text
              style={{
                fontFamily: "Questrial",
                fontWeight: "500",
                fontSize: 16,
                color: "#000"
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
          <ListItem button noBorder onPress={this.report}>
            <Left>
              <Icon
                active
                name="ios-images-outline"
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
                Reporte
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
