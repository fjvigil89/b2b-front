import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { H3, Text, Container, Header, Left, Button, Icon, Body, Title, Right, Content, Card, Thumbnail, CardItem } from 'native-base';

import LoginScreen from './containers/login/LoginApp';

import { Logout } from './actions/user';

const avatar = require('../src/images/jumbo.png');
const cencosud = require('../src/images/cencosud.png');

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
            <Title style={{ fontFamily: 'Questrial' }}>Mis Salas</Title>
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
        <Content style={{ padding: 2, backgroundColor: '#f4f4f4' }}>
          <Card
            style={{
              borderWidth: 0.3,
              borderColor: '#d6d7da',
            }}
            transparent
          >
            <CardItem style={{ marginBottom: 0, shadowOpacity: 0, backgroundColor: 'transparent' }}>
              <Left>
                <Thumbnail large source={avatar} />
                <Body>
                  <H3 style={{ fontFamily: 'Questrial' }}>JUMBO Costanera Center</H3>
                  <Text note style={{ fontFamily: 'Questrial' }}>Con medición B2B</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{ margin: 0, padding: 0 }}>
              <Left style={{ margin: 0, padding: 0 }}>
                <Text style={{ fontSize: 10, fontFamily: 'Questrial' }}>Ultima actualización</Text>
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
