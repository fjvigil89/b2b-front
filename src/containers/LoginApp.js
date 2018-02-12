import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import * as loginActions from '../actions/member';
import Loading from '../components/Loading';

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
      <View>
        <NavigationBar
          title={titleConfig}
          tintColor="#ADF8D1"
        />
        <View>
          {error}
          <TextInput
            placeholder="email"
            onChangeText={v => this.handleChange('email', v)}
          />

          <TextInput
            placeholder="password"
            onChangeText={v => this.handleChange('password', v)}
          />

          <Icon.Button
            name="envelope-o"
            onPress={this.handleSubmit}
          >
            Login
          </Icon.Button>
        </View>
      </View>
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
