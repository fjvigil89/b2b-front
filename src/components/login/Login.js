import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { Image, View } from "react-native";
import { connect } from "react-redux";

// Components
import Messages from "@common/messages/Messages";
import Spacer from "@common/spacer/Spacer";
import Loading from "@components/loading/Loading";

// Actions
import { Login, ChangeInputLogin } from "@components/login/LoginActions";

// Styles
import styles from "@components/login/LoginStyles";

// Images
const logoCadem = require("@assets/images/logo-cadem.png");
const loginBackground = require("@assets/images/login-background.png");

class LoginScreen extends Component {
  static propTypes = {
    Login: PropTypes.func.isRequired,
    ChangeInputLogin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  };

  static defaultProps = {
    errorMessage: null,
    email: "",
    password: ""
  };

  handleSubmit = () => {
    this.props.Login(this.props.email, this.props.password);
  };

  render() {
    const { isLoading, errorMessage } = this.props;

    if (isLoading) return <Loading />;

    return (
      <Container>
        <Content
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={false}
          enableAutoAutomaticScroll={false}
        >
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFF"
            }}
          >
            <Image
              style={{
                backgroundColor: "transparent"
              }}
              source={logoCadem}
            />
            <Text style={{ fontFamily: "Bree", fontSize: 22 }}>SmartB2B</Text>
            <Image
              style={{
                position: "absolute",
                height: "100%",
                bottom: 0
              }}
              source={loginBackground}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#F4F4F4"
            }}
          >
            <Form style={styles.image}>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label style={{ fontFamily: "Questrial" }}>Usuario</Label>
                <Input
                  style={{ fontFamily: "Questrial" }}
                  autoCapitalize="none"
                  value={this.props.email}
                  keyboardType="email-address"
                  onChangeText={v => this.props.ChangeInputLogin("email", v)}
                />
              </Item>
              <Item floatingLabel style={{ marginRight: 15 }}>
                <Label style={{ fontFamily: "Questrial" }}>Contraseña</Label>
                <Input
                  secureTextEntry
                  onChangeText={v => this.props.ChangeInputLogin("password", v)}
                />
              </Item>

              <Spacer size={20} />

              <Button
                block
                style={{ margin: 15, marginTop: 40 }}
                onPress={this.handleSubmit}
              >
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
  isLoading: state.messages.loading,
  infoMessage: state.messages.info || null,
  errorMessage: state.messages.error || null,
  successMessage: state.messages.success || null,
  email: state.user.email,
  password: state.user.password
});

const mapDispatchToProps = {
  Login,
  ChangeInputLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
