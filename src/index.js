import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { H3, Text, Container, Header, Left, Button, Icon, Body, Title, Right, Footer, Content, FooterTab, List, Card, Thumbnail, SwipeRow, CardItem } from 'native-base';
import { View, Image } from 'react-native';

import LoginScreen from './containers/login/LoginApp';

import { Logout } from './actions/user';

const avatar = require('../src/images/jumbo.png');
const cencosud = require('../src/images/cencosud.png');
const remote = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Starsinthesky.jpg';
const resizeMode = 'center';

class Root extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    onLogout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
  }

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    this.props.onLogout()
      .then(() => {
      })
      .catch(e => console.log(`Error: ${e}`));
  };

  render = () => {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Mis Salas</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="refresh" />
            </Button>
            <Button transparent>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <Content style={{ padding: 2 }}>
          <Card style={{ backgroundColor: '#9BC53D', marginBottom: 0 }}>
            <CardItem style={{ marginBottom: 0, shadowOpacity: 0, backgroundColor: 'transparent' }}>
              <Left>
                <Thumbnail large source={avatar} />
                <Body>
                  <H3 style={{ color: '#FFFFFF' }}>JUMBO Costanera Center</H3>
                  <Text note style={{ color: '#FFFFFF' }}>Con medición B2B</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{ margin: 0, padding: 0, backgroundColor: '#C8DF95' }}>
              <Left style={{ margin: 0, padding: 0 }}>
                <Icon active name="calendar" style={{ fontSize: 20, color: '#FFFFFF' }} />
                <Text style={{ fontSize: 12 }}>Ultima actualización</Text>
              </Left>
              <Right style={{ margin: 0, padding: 0 }}>
                <Text style={{ fontSize: 12 }}>11h ago</Text>
              </Right>
            </CardItem>
          </Card>

          <Card style={{ backgroundColor: '#F4C92E', marginBottom: 0 }}>
            <CardItem style={{ marginBottom: 0, shadowOpacity: 0, backgroundColor: 'transparent' }}>
              <Left>
                <Thumbnail large source={cencosud} />
                <Body>
                  <H3 style={{ color: '#FFFFFF' }}>LIDER Providencia</H3>
                  <Text note style={{ color: '#FFFFFF' }}>Sin medición B2B</Text>
                </Body>
              </Left>
            </CardItem>
            {/*
            <CardItem style={{ margin: 0, padding: 0, backgroundColor: '#F9E18D' }}>
              <Left style={{ margin: 0, padding: 0 }}>
                <Icon active name="calendar" style={{ fontSize: 20, color: '#FFFFFF' }} />
                <Text style={{ fontSize: 12 }}>Ultima actualización</Text>
              </Left>
              <Right style={{ margin: 0, padding: 0 }}>
                <Text style={{ fontSize: 12 }}>11h ago</Text>
              </Right>
            </CardItem>
            */}
          </Card>

          <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.handleLogout}>
            <Text>Salir</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = {
  onLogout: Logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
