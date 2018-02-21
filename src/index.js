import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Container, Header, Left, Button, Icon, Body, Title, Right, Footer, Content, FooterTab, List, ListItem, Thumbnail, SwipeRow } from 'native-base';
import { View } from 'react-native';

import LoginScreen from './containers/login/LoginApp';

import { Logout } from './actions/user';

const avatar = require('../src/images/avatar.png');

const datas = [
  {
    img: avatar,
    text: 'Jumbo Costanera',
    note: 'Its time to build a difference . .',
  },
  {
    img: avatar,
    text: 'Kumar Sanket',
    note: 'One needs courage to be happy and smiling all time . . ',
  },
  {
    img: avatar,
    text: 'Megha',
    note: 'Live a life style that matchs your vision',
  },
  {
    img: avatar,
    text: 'Atul Ranjan',
    note: 'Failure is temporary, giving up makes it permanent',
  },
  {
    img: avatar,
    text: 'Saurabh Sahu',
    note: 'The biggest risk is a missed opportunity !!',
  },
  {
    img: avatar,
    text: 'Varun Sahu',
    note: 'Wish I had a Time machine . .',
  },
];

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
        <Content>
          <List
            dataArray={datas}
            renderRow={data => (
              <SwipeRow
                leftOpenValue={75}
                rightOpenValue={-75}
                left={
                  <Button success >
                    <Icon active name="add" style={{ color: '#FFF' }} />
                  </Button>
                }
                right={
                  <Button danger >
                    <Icon active name="trash" />
                  </Button>
                }
                body={
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 20,
                    }}
                  >
                    <View style={{
                      flex: 0.15,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    >
                      <Thumbnail small source={data.img} />
                    </View>
                    <View style={{
                      flex: 0.65,
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}
                    >
                      <Text>Jumbo Costanera Center</Text>
                      <Text
                        note
                        style={{
                          marginLeft: 8,
                        }}
                      >
                        Providencia #5000, Santiago.
                      </Text>
                    </View>
                    <View style={{
                      flex: 0.2,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                    >
                      <Button transparent>
                        <Icon name="star" />
                      </Button>
                    </View>
                    
                  </View>
                }
              />
            )}
          />
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.handleLogout}>
            <Text>Salir</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
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
