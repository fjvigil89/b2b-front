import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  Container,
  View,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Body,
  Right,
  DeckSwiper,
  Text,
  Card, 
  CardItem,
  Input,
} from "native-base";


class Polls extends Component {
  static propTypes = { };
  static defaultProps = {
  };

  componentWillMount = () => {
  };

  render = () => {
    const cards = [
      {
        title: 'Pregunta 1',
        description: 'This is just a transparent card with some text to boot',
        type: 'text',
        data: []
      },
      {
        Title: 'Pregunta 2',
        description: 'This is just a transparent card with some text to boot',
        type: 'multiple',
        data: [{
          text: 'text 1'
        },
        {
          text: 'text 2'
        },
        {
          text: 'text 3'
        }] 
      },
      {
        title: 'Pregunta 3',
        description: 'This is just a transparent card with some text to boot',
        type: 'radio',
        data: [{
          text: 'text 1'
        },
        {
          text: 'text 2'
        },
        {
          text: 'text 3'
        }]
        
      },
    ];
    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
          <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
          </Button>
          </Left>
          <Body>
          <Title>Encuestas</Title>
          </Body>
          <Right />
        </Header>
        <View>
          <DeckSwiper dataSource={cards}
                      ref={(c) => this._deckSwiper = c}
                        renderItem={item => 
                          <Card style={{ elevation: 3 }}>
                            <CardItem>
                              <Body>
                                <Text>{item.title}</Text>
                                <Text note>
                                  {item.description}
                                </Text>
                              </Body>
                            </CardItem>
                            <CardItem>
                              <Input placeholder="Username" /> 
                            </CardItem>
                          </Card>
                        }
                      

            />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Text>Siguiente</Text>
          </Button>
        </View>
      </Container>
    );
  };
}

const mapStateToProps = state => state;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);