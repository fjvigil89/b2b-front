import React, { Component } from "react";
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
import { Actions } from "react-native-router-flux";

import Publication from "@components/wall/publication/Publication";

class Wall extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount = () => {};

  render = () => (
    <Container>
      <Header style={{ borderBottomWidth: 0 }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              Actions.pop();
            }}
          >
            <Icon name="arrow-back" style={{ color: "#FFFFFF" }} />
          </Button>
        </Left>
        <Body>
          <Title>Comments</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Publication />
      </Content>
    </Container>
  );
}

export default Wall;
