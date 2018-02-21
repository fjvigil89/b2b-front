import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Button,
  Text, Form, Item, Label, Input } from 'native-base';
import { Image, View } from 'react-native';

import { connect } from 'react-redux';

import Messages from '../../components/Messages';
import Spacer from '../../components/Spacer';
import Loading from '../../components/Loading';

import { Login } from '../../actions/user';
import styles from './styles';

const logoImage = require('../../images/logo-cadem.png');

class LoginScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorMessage: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: 'boadude@gmail.com',
      password: 'slipknot',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.props.onLogin(this.state)
      .then(() => {
        // Actions.home();
      })
      .catch(e => console.log(`Error: ${e}`));
  };

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  render() {
    const { isLoading, errorMessage } = this.props;

    if (isLoading) return <Loading />;

    return (
      <Container>
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} scrollEnabled={false}>
          <View
            style={{
              flex: 0.35,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={logoImage} />
          </View>
          <View
            style={{
              flex: 0.65,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Form style={styles.image}>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label>Email</Label>
                <Input
                  autoCapitalize="none"
                  value={this.state.email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label>Contraseña</Label>
                <Input
                  secureTextEntry
                  onChangeText={v => this.handleChange('password', v)}
                />
              </Item>

              <Spacer size={20} />

              <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.handleSubmit}>
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
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onLogin: Login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
