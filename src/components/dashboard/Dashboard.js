import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "native-base";

// Components
import LoginScreen from "@components/login/Login";
import Loading from "@components/loading//Loading";
import SalasHeader from "@components/salas/salas_header/SalasHeader";
import SalasList from "@components/salas/salas_list/SalasList";
import { CheckToken } from "@components/login/LoginActions.js";

class Dashboard extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    CheckToken: PropTypes.func.isRequired
  };

  static defaultProps = {
    isAuthenticated: false,
    isLoading: true
  };

  componentWillMount = () => {
    this.props.CheckToken();
  };

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
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.messages.loading
});

const mapDispatchToProps = {
  CheckToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
