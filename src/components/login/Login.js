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
import { Image, View, Dimensions, ImageBackground } from "react-native";
import { connect } from "react-redux";

// Components
import Messages from "@common/messages/Messages";
import Spacer from "@common/spacer/Spacer";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

// Actions
import { Login, ChangeInputLogin } from "@components/login/LoginActions";

// Styles
import styles from "@components/login/LoginStyles";

// Images
const logoCadem = require("@assets/images/logo.png");
const loginBackground = require("@assets/images/login-background.png");
const backgroundImage = require("@assets/images/background_app_cademsmart-v2.png");

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class LoginScreen extends Component {
  static propTypes = {
    Login: PropTypes.func.isRequired,
    ChangeInputLogin: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  };

  static defaultProps = {
    errorMessage: null,
    email: "",
    password: ""
  };

  state = {
    loading: false
  };

  handleSubmit = () => {
    this.setState({
      loading: true
    });

    this.props
      .Login(this.props.email, this.props.password)
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

  render() {
    const { errorMessage } = this.props;

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
              flex: 0.6,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFF"
            }}
          >
            <Image
              style={{
                position: "absolute",
                width: deviceWidth,
                height: deviceHeight,
                top: 0,
                left: 0,
                zIndex: 100
              }}
              source={backgroundImage}
            />
            <Image
              style={{
                zIndex: 200,
                width: deviceWidth,
                height: 90
              }}
              source={logoCadem}
            />
            <Text style={{ fontFamily: "Bree", fontSize: 30, zIndex: 200 }}>
              SMARTapp
            </Text>
            <Image
              style={{
                position: "absolute",
                width: deviceWidth,
                height: 200,
                bottom: 0,
                zIndex: 200,
                opacity: 0.85
              }}
              source={loginBackground}
            />
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#F4F4F4",
              opacity: 0.85
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
                style={{ margin: 15, marginTop: 40, zIndex: 5000 }}
                onPress={this.handleSubmit}
              >
                <Text>Ingresar</Text>
              </Button>
            </Form>

            {errorMessage && <Messages message={errorMessage} />}
          </View>
        </Content>
        {this.state.loading && <LoadingOverlay />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
