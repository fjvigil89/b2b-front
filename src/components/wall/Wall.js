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
import Publication from "@components/wall/publication/Publication";
import { Actions } from "react-native-router-flux";

class Wall extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount = () => {};

  render = () => (
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
        <Publication />
        <Publication />
        <Publication />
      </Content>
    </Container>
  );
}

export default Wall;
