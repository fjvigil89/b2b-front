import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body
} from "native-base";
import ListWall from "@components/wall/list_wall/ListWall";
import { Actions } from "react-native-router-flux";

class Wall extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount = () => {};

  render = () => {
    const backgroundImage = require("@assets/images/background-detalle-salas.png");
    const logo = require("@assets/images/jumbo.png");
    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Muro</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <ListWall />
          <ListWall />
          <ListWall />
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
