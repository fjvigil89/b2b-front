import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "native-base";

// Components
import LoginScreen from "@components/login/Login";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";
import SalasHeader from "@components/salas/salas_header/SalasHeader";
import SalasList from "@components/salas/salas_list/SalasList";
import { CheckToken } from "@components/login/LoginActions.js";

class Dashboard extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    CheckToken: PropTypes.func.isRequired
  };

  static defaultProps = {
    isAuthenticated: false
  };

  state = {
    loading: false
  };

  componentWillMount = () => {
    this.setState({
      loading: true
    });

    this.props
      .CheckToken()
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render = () => {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    return (
      <Container>
        <SalasHeader />
        <SalasList />
        {this.state.loading && <LoadingOverlay />}
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
