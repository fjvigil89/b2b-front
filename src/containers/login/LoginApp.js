import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, 
  Right, Body, Icon, Text, Subtitle, Grid, Row, Form, Item, Label, Input } from 'native-base';
import { Image, View, ScrollView, RefreshControl } from 'react-native';

import { connect } from 'react-redux';

import * as loginActions from '../../actions/member';
import Loading from '../../components/Loading';
import styles from './styles';

const logoImage = require('../../images/logo_login.png');

class LoginScreen extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: 'user@gmail.com',
      password: 'user',
      refreshing: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const { email, password } = this.state;

    console.log(email, password, this.props);
  };

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  render() {
    const { loading, error } = this.props;

    if (loading) return <Loading />;

    const titleConfig = {
      title: 'Meetup Async Login',
      tintColor: 'black',
    };

    return (
      <Container>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={logoImage} style={styles.image} />
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ScrollView>
              <Form style={styles.image}>
                <Item floatingLabel style={{ marginRight: 15 }}>
                  <Label>Username</Label>
                  <Input />
                </Item>
                <Item floatingLabel style={{ marginRight: 15 }}>
                  <Label>Password</Label>
                  <Input secureTextEntry />
                </Item>
              </Form>
              <Button block style={{ margin: 15, marginTop: 50 }}>
                <Text>Sign In</Text>
              </Button>
            </ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  onLogin: loginActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
