import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginScreen from './containers/login/LoginApp';

class Root extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  static defaultProps = {
    isAuthenticated: false,
  }

  render = () => {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    return <LoginScreen />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Root);
