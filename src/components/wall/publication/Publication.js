import React, { Component } from "react";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Actions } from "react-native-router-flux";

class Publication extends Component {
  static propTypes = {};

  static defaultProps = {};

  render = () => {
    const profile = require("@assets/images/profile.png");
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={profile} />
            <Body>
              <Text>Esteban Paredes</Text>
              <Text note>Hace 3 min</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Hola, vengo a saludar a toda la gente de este canal.</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Me gustas</Text>
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => {
                Actions.wallComments();
              }}
            >
              <Icon active name="chatbubbles" />
              <Text>4 Comentarios</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  };
}

export default Publication;
