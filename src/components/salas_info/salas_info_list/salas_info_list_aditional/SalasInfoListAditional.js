import React from "react";
import { View, Image } from "react-native";
import { Text, Icon } from "native-base";
import * as Animatable from "react-native-animatable";

class SalasInfoListAditional extends React.Component {
  render() {
    const backgroundImage = require("@assets/images/background-detalle-sala-categoria.png");

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F4F4F4",
          paddingTop: 0
        }}
      >
        <Image
          style={{
            position: "absolute",
            top: 0,
            height: "100%"
          }}
          source={backgroundImage}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 5,
            paddingBottom: 1,
            paddingRight: 10,
            marginBottom: 5,
            marginLeft: 30
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Bree",
              fontWeight: "bold"
            }}
          >
            Detalle de la Categoria
          </Text>
        </View>
        <Animatable.View
          animation="fadeInRight"
          duration={1000}
          style={{
            flex: 1,
            paddingBottom: 1,
            marginBottom: 4
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 0.1,
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Icon
                ios="ios-arrow-round-forward"
                android="ios-arrow-round-forward"
                style={{ fontSize: 30, margin: 0 }}
              />
            </View>
            <View
              style={{
                flex: 0.9,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 0
              }}
            >
              <View
                style={{
                  flex: 0.8,
                  flexDirection: "column"
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 13,
                    fontFamily: "Questrial"
                  }}
                >
                  Chequear pedidos
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 18,
                    fontFamily: "Questrial",
                    fontWeight: "bold",
                    marginTop: 5
                  }}
                >
                  $1.500.000
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  alignItems: "flex-end"
                }}
              >
                <Icon
                  ios="ios-arrow-dropright"
                  android="ios-arrow-dropright"
                  style={{ fontSize: 30 }}
                />
              </View>
            </View>
          </View>
        </Animatable.View>

        <Animatable.View
          animation="fadeInRight"
          duration={1000}
          style={{
            flex: 1,
            paddingBottom: 1,
            marginBottom: 4
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 0.1,
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Icon
                ios="ios-arrow-round-forward"
                android="ios-arrow-round-forward"
                style={{ fontSize: 30, margin: 0 }}
              />
            </View>
            <View
              style={{
                flex: 0.9,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#FFF",
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 0
              }}
            >
              <View
                style={{
                  flex: 0.8,
                  flexDirection: "column"
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 13,
                    fontFamily: "Questrial"
                  }}
                >
                  Chequear pedidos
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 18,
                    fontFamily: "Questrial",
                    fontWeight: "bold",
                    marginTop: 5
                  }}
                >
                  $1.500.000
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  alignItems: "flex-end"
                }}
              >
                <Icon
                  ios="ios-arrow-dropright"
                  android="ios-arrow-dropright"
                  style={{ fontSize: 30 }}
                />
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

export default SalasInfoListAditional;
