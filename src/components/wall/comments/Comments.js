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
  Body,
  Text,
  View
} from "native-base";
import { Actions } from "react-native-router-flux";

import Publication from "@components/wall/publication/Publication";
import Comment from "@components/wall/comments/comment/Comment";

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
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Bree",
                fontWeight: "bold",
                marginBottom: 0
              }}
            >
              Comentarios
            </Text>
          </View>
        </View>
        <Comment />
        <Comment />
        <Comment subcomment />
      </Content>
    </Container>
  );
}

export default Wall;
