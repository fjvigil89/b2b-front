import React from "react";
import { connect } from "react-redux";
import { View, StatusBar, Dimensions } from "react-native";
import {
  Container,
  Button,
  Text,
  Content,
  Left,
  Body,
  Title,
  Right,
  Header,
  Textarea,
  Thumbnail
} from "native-base";
import { Actions } from "react-native-router-flux";

import ListadoProductosPorCategoriaAcccion from "@components/salas_info/salas_info_detal_action/SalasInfoDetailActionActions.js";

const deviceHeight = Dimensions.get("window").height;

class SalasInfoDetailAction extends React.Component {
  render() {
    const profile = require("@assets/images/profile.png");

    return (
      <Container style={{ backgroundColor: "#F4F4F4" }}>
        <StatusBar barStyle="dark-content" />
        <Header style={{ borderBottomWidth: 0, backgroundColor: "#F4F4F4" }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <Text style={{ fontSize: 14 }}>Cancelar</Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 14, color: "#000" }}>
              Crear publicación
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Text style={{ fontSize: 14 }}>Publicar</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF"
            }}
          >
            <View
              style={{
                margin: 0,
                padding: 0,
                flex: 1,
                backgroundColor: "transparent",
                marginBottom: 5
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: 10,
                    backgroundColor: "#FFF",
                    borderRadius: 10
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "flex-start"
                    }}
                  >
                    <View
                      style={{
                        flex: 0.1,
                        justifyContent: "center",
                        alignItems: "flex-start"
                      }}
                    >
                      <Thumbnail small source={profile} />
                    </View>
                    <View
                      style={{
                        flex: 0.9,
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginLeft: 10,
                        paddingTop: 8
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: "Questrial",
                          fontWeight: "bold"
                        }}
                      >
                        Juanito Pere
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <Textarea
              style={{
                borderColor: "#F4F4F4",
                borderWidth: 2,
                height: deviceHeight - 250,
                fontSize: 18
              }}
              placeholder="Escribe lo que piensas..."
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  productos: state.productos.productos
});

const mapDispatchToProps = {
  ListadoProductosPorCategoriaAcccion
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SalasInfoDetailAction
);
