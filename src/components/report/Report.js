import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body,
  Footer,
  FooterTab,
  Text,
  Content,
  View
} from "native-base";
import { Actions } from "react-native-router-flux";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#067715",
    margin: 10,
    flex: 1,
    flexDirection: "row"
  },
  left: {
    borderLeftWidth: 1.5,
    borderColor: "#067715",
    flex: 1,
    flexDirection: "column"
  },
  borderTop: {
    borderBottomWidth: 1.5,
    borderColor: "#067715",
    flex: 1
  }
});

class Report extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentWillMount = () => {};

  render = () => (
    <Container>
      <Header style={{ borderBottomWidth: 0 }}>
        <Left>
          <Button transparent onPress={Actions.drawerOpen}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Reporte</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            marginTop: 15
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="md-medal"
              style={{
                fontSize: 70,
                color: "#0D1F81"
              }}
            />
            <Text>56.7MM</Text>
            <Text>Total Ventas</Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="logo-usd"
              style={{
                fontSize: 70,
                color: "green"
              }}
            />
            <Text>56.7MM</Text>
            <Text>Venta Perdida</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View>
            <Image
              style={{ height: 100, width: 100 }}
              source={require("@assets/images/jumbo.png")}
            />
          </View>

          <View style={styles.left}>
            <View style={styles.borderTop}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Text>15,3 MM</Text>
                  <Icon
                    name="md-arrow-round-up"
                    style={{
                      fontSize: 20,
                      color: "green",
                      marginLeft: 10
                    }}
                  />
                  <Text style={{ marginLeft: 10 }}>13%</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    name="ios-arrow-forward-outline"
                    style={{
                      fontSize: 30,
                      color: "green",
                      marginLeft: 10
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Text>15,3 MM</Text>
                  <Icon
                    name="md-arrow-round-up"
                    style={{
                      fontSize: 20,
                      color: "green",
                      marginLeft: 10
                    }}
                  />
                  <Text style={{ marginLeft: 10 }}>13%</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    name="ios-arrow-down-outline"
                    style={{
                      fontSize: 30,
                      color: "green",
                      marginLeft: 10
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, margin: 10, flexDirection: "row" }}>
          <View
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="md-arrow-round-up"
              style={{
                fontSize: 40,
                color: "green",
                marginLeft: 10
              }}
            />
          </View>
          <View style={{ flex: 5 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text>0%</Text>
              <Text style={{ marginLeft: 8 }}>Salas cerradas</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text>30%</Text>
              <Text style={{ marginLeft: 8 }}>Salas nuevas</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text>0%</Text>
              <Text style={{ marginLeft: 8 }}>Productos descatalogados</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text>0%</Text>
              <Text style={{ marginLeft: 8 }}>Salas cerradas</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View>
            <Image
              style={{ height: 100, width: 100 }}
              source={require("@assets/images/jumbo.png")}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>10,3 MM</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="md-arrow-round-up"
                style={{
                  fontSize: 20,
                  color: "green",
                  marginLeft: 10
                }}
              />
              <Text style={{ marginLeft: 10 }}>13%</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>10,3 MM</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="md-arrow-round-up"
                style={{
                  fontSize: 20,
                  color: "green",
                  marginLeft: 10
                }}
              />
              <Text style={{ marginLeft: 10 }}>13%</Text>
            </View>
          </View>
        </View>
      </Content>
      <Footer>
        <FooterTab>
          <Button>
            <Text>Hoy</Text>
          </Button>
          <Button>
            <Text>Semana</Text>
          </Button>
          <Button active>
            <Text>Mes</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
