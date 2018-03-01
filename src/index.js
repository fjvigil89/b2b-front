import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Container, Header, Left, Button, Icon, Body, Title, Right, Content } from 'native-base';

import LoginScreen from './containers/login/LoginApp';
import SalaDetail from './components/SalaDetail';

import { Logout } from './actions/user';

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

    const listSalas = [{
      id: 1,
      imagen: 'jumbo',
      sala: 'Jumbo Costanera',
      b2b: 0,
    }, {
      id: 2,
      imagen: 'jumbo',
      sala: 'Jumbo Costanera',
      b2b: 0,
    }, {
      id: 3,
      imagen: 'jumbo',
      sala: 'Jumbo Costanera',
      b2b: 0,
    }, {
      id: 4,
      imagen: 'jumbo',
      sala: 'Jumbo Costanera',
      b2b: 0,
    }];

    const listadoSalas = listSalas.map(sala => (
      <SalaDetail data={sala} key={sala.id} />
    ));

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
        <Content style={{ backgroundColor: '#F4F4F4' }}>
          { listadoSalas }

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
