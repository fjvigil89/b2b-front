import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, WebView } from "react-native";
import { Actions } from "react-native-router-flux";

import LoginScreen from "@components/login/Login";

class Gallery extends Component {
  static propTypes = {
  };

  static defaultProps = {
    isAuthenticated: false,
    token: ''
  };

  render = () => {
    const { token, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    return (
      <View style={styles.view}>
         <WebView source={{uri: `http://galeria.cademsmart.cl?t=${token}`}}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  token: state.user.token
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
