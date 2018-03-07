import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import LoginScreen from './containers/login/LoginApp';

import SalasHeader from './components/SalasHeader';
import Loading from './components/Loading';
import SalasList from './components/SalasList';

class Root extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isAuthenticated: false,
    isLoading: true,
  }

  render = () => {
    const { isAuthenticated, isLoading } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    } else if (isLoading) {
      return <Loading />;
    }

    return (
      <Container>
        <SalasHeader />
        <SalasList />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.status.loading || false,
});

export default connect(mapStateToProps)(Root);
