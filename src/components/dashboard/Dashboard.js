import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { Container, Text, Content } from "native-base";

// Components
import LoginScreen from "@components/login/Login";
import SalasHeader from "@components/salas/salas_header/SalasHeader";
import Loading from "@components/loading//Loading";
import SalasList from "@components/salas/salas_list/SalasList";

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
        <SalasHeader />
        <Content style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 0.3, backgroundColor: '#083D77' }}>
            <Text>caquitaaaa</Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <ScrollView>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
              <Text>Hellooasdasdooo</Text>
            </ScrollView>
          </View>
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
