import React from "react";
import { View, StatusBar, Platform } from "react-native";
import {
  Container,
  Text,
  Content,
  Body,
  Title,
  Header,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";

const platform = Platform.OS;

class Help extends React.Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <StatusBar barStyle="dark-content" />
        <Header
          style={{
            borderBottomWidth: 0,
            backgroundColor: "#F4F4F4"
          }}
          iosBarStyle="dark-content"
        >
          <Body>
            <Title
              style={{
                fontSize: 14,
                color: platform === "android" ? "#FFF" : "#000"
              }}
            >
              AYUDA
            </Title>
          </Body>
        </Header>

        <Content>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF"
            }}
          >
            <Card>
              <CardItem header bordered>
                <Text>Intruducción</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    En esta sección podras visualizar una guia para que puedas
                    entender de mejor manera la sección de reportes.
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>by CademSmart B2B</Text>
              </CardItem>
            </Card>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              light
              onPress={() => {
                Actions.pop();
              }}
            >
              <Text>Cerrar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Help;
