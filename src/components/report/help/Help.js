import React from "react";
import { View, StatusBar, Platform, Image } from "react-native";
import {
  Container,
  Text,
  Content,
  Body,
  Title,
  Header,
  Tabs,
  ScrollableTab,
  Footer,
  FooterTab,
  Button,
  Tab,
  CardItem,
  Card,
  TabHeading,
  Icon,
  ListItem,
  List,
  Left
} from "native-base";
import { Actions } from "react-native-router-flux";
import { Ionicons } from "@expo/vector-icons";

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
          hasTabs
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

        <Content scrollEnabled={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF"
            }}
          >
            <Tabs style={{ backgroundColor: "#F4F4F4" }}>
              <Tab
                heading={
                  <TabHeading>
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15
                      }}
                    >
                      Filtros
                    </Text>
                  </TabHeading>
                }
              >
                <View style={{ padding: 10, marginTop: 5 }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderBottomColor: "#DEDEDE",
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginBottom: 0,
                        paddingBottom: 5,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      FILTRAR POR DIA
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: "Questrial",
                      fontSize: 15,
                      textAlign: "justify",
                      lineHeight: 20
                    }}
                  >
                    Seleccione el último día disponible en B2B y compare su
                    desempeño y oportunidad en ventas contra el mismo día de la
                    semana anterior.
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderBottomColor: "#DEDEDE",
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginBottom: 0,
                        paddingBottom: 5,
                        marginTop: 20,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      FILTRAR POR SEMANA
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: "Questrial",
                      fontSize: 15,
                      textAlign: "justify",
                      lineHeight: 20
                    }}
                  >
                    Seleccione el acumulado de la semana en curso y compare su
                    desempeño y oportunidad en ventas contra los mismos días de
                    la semana anterior.
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderBottomColor: "#DEDEDE",
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        marginBottom: 0,
                        paddingBottom: 5,
                        marginTop: 20,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      FILTRAR POR MES
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: "Questrial",
                      fontSize: 15,
                      textAlign: "justify",
                      lineHeight: 20
                    }}
                  >
                    Seleccione el acumulado del mes en curso y compare su
                    desempeño y oportunidad en ventas contra los mismos días del
                    mes anterior.
                  </Text>
                </View>
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15
                      }}
                    >
                      Venta en valor
                    </Text>
                  </TabHeading>
                }
              >
                <View
                  style={{
                    marginTop: 5,
                    padding: 10
                  }}
                >
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 15,
                      textAlign: "justify",
                      lineHeight: 20
                    }}
                  >
                    Muestra la venta en pesos del periodo seleccionado, y su
                    variación porcentual respecto al periodo anterior. Si crece
                    es
                    <Text style={{ color: "green" }}> VERDE</Text>, si decrece
                    es
                    <Text style={{ color: "red" }}> ROJA</Text>.
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderBottomColor: "#DEDEDE",
                      borderBottomWidth: 1,
                      marginTop: 15,
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        paddingBottom: 5,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      CAUSAS
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Cierre de salas.
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Apertura de salas.
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Descatalogación de productos.
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Innovaciones o aumento o caída en las mismas salas y
                      productos.
                    </Text>
                  </View>
                </View>
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15
                      }}
                    >
                      Venta perdida
                    </Text>
                  </TabHeading>
                }
              >
                <View
                  style={{
                    marginTop: 5,
                    padding: 10
                  }}
                >
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: "Questrial",
                      fontSize: 15,
                      textAlign: "justify",
                      lineHeight: 20
                    }}
                  >
                    Muestra la venta adicional que se hubiera obtenido al no
                    tener problemas o casos de días con venta cero, y su
                    variación respecto al periodo anterior. Si crece es
                    <Text style={{ color: "red" }}> ROJA</Text>, si decrece es
                    <Text style={{ color: "green" }}> VERDE</Text>.
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderBottomColor: "#DEDEDE",
                      borderBottomWidth: 1,
                      marginTop: 15,
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        paddingBottom: 5,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      CAUSAS
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Tienda no posee stock (se deben chequear pedidos).
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Problemas de reposición en sala.
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Desajustes en el inventario sistémico.
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: 5,
                      paddingRight: 5
                    }}
                  >
                    <Ionicons
                      style={{ fontSize: 13 }}
                      name="md-arrow-round-forward"
                    />
                    <Text
                      style={{
                        fontFamily: "Questrial",
                        fontSize: 15,
                        marginLeft: 10,
                        textAlign: "justify",
                        lineHeight: 20
                      }}
                    >
                      Productos descatalogados o bloqueados.
                    </Text>
                  </View>
                </View>
              </Tab>
            </Tabs>
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
