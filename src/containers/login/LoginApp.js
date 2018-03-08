import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Button,
  Text, Form, Item, Label, Input } from 'native-base';
import { Image, View } from 'react-native';

import { connect } from 'react-redux';

import Messages from '../../components/Messages';
import Spacer from '../../components/Spacer';
import Loading from '../../components/Loading';

import { login, changeInputLogin } from '../../actions/user';
import styles from './styles';

const logoImage = require('../../images/logo-cadem.png');
const backgroundImage = require('../../images/login-background.png');

class LoginScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    login: PropTypes.func.isRequired,
    changeInputLogin: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
  }

  static defaultProps = {
    errorMessage: null,
    email: '',
    password: '',
  }

  handleSubmit = () => {
    this.props.login(this.props.email, this.props.password)
      .catch(e => console.log(`Error: ${e}`));
  };

  render() {
    const { isLoading, errorMessage } = this.props;

    if (isLoading) return <Loading />;

    return (
      <Container>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={logoImage} />
            <Text style={{ fontFamily: 'Bree', fontSize: 22 }}>SmartB2B</Text>
            <Image
              style={{
                position: 'absolute',
                height: '100%',
                bottom: 0,
              }}
              source={backgroundImage}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#F4F4F4',
            }}
          >
            <Form style={styles.image}>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label style={{ fontFamily: 'Questrial' }}>Email</Label>
                <Input
                  style={{ fontFamily: 'Questrial' }}
                  autoCapitalize="none"
                  value={this.props.email}
                  keyboardType="email-address"
                  onChangeText={v => this.props.changeInputLogin('email', v)}
                />
              </Item>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label style={{ fontFamily: 'Questrial' }}>Contraseña</Label>
                <Input
                  secureTextEntry
                  onChangeText={v => this.props.changeInputLogin('password', v)}
                />
              </Item>

              <Spacer size={20} />

              <Button block style={{ margin: 15, marginTop: 40 }} onPress={this.handleSubmit}>
                <Text>Ingresar</Text>
              </Button>
            </Form>

            {errorMessage && <Messages message={errorMessage} />}
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.status.loading,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = {
  login,
  changeInputLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
