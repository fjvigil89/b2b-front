import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import LoginScreen from "@components/login/Login";
import Report from "@components/report/Report";
import Dashboard from "@components/dashboard/Dashboard";
import { CheckToken } from "@components/login/LoginActions.js";

class Check extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    CheckToken: PropTypes.func.isRequired
  };

  static defaultProps = {
    isAuthenticated: false
  };

  componentWillMount = () => {
    this.checkToken();
  };

  async checkToken() {
    this.props.CheckToken();
  }

  render = () => {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    return <Dashboard />;
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = {
  CheckToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Check);
