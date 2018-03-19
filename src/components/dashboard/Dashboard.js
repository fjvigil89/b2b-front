import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import { Container, Text, Content, Thumbnail, Icon, Button } from "native-base";

// Components
import LoginScreen from "@components/login/Login";
import SalasHeader from "@components/salas/salas_header/SalasHeader";
import Loading from "@components/loading//Loading";
import SalasList from "@components/salas/salas_list/SalasList";

import SalasInfoHeader from "@components/salas_info/salas_info_header/SalasInfoHeader";
import SalasInfoDetail from "@components/salas_info/salas_info_detail/SalasInfoDetail";
import SalasInfoList from "@components/salas_info/salas_info_list/SalasInfoList";

class Dashboard extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    isAuthenticated: false,
    isLoading: true
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
        <SalasInfoHeader />
        <Content scrollEnabled={false}>
          <SalasInfoDetail />
          <SalasInfoList />
        </Content>
      </Container>
    );
    /*
    return (
      <Container>
        <SalasHeader />
        <SalasList />
      </Container>
    );
    */
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.messages.loading
});

export default connect(mapStateToProps)(Dashboard);
