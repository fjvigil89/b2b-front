import React from "react";
import { View } from "react-native";
import { Text, Button, Icon } from "native-base";
import * as Animatable from "react-native-animatable";

class SalasInfoListAditional extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F4F4F4",
          padding: 5
        }}
      >
        <Animatable.View
          animation="fadeInRight"
          duration={1000}
          style={{
            flex: 1,
            flexDirection: "row",
            paddingBottom: 3
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: 10
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Questrial",
                marginLeft: 5
              }}
            >
              Chequear pedidos
            </Text>
          </View>
          <View
            animation="fadeInRight"
            duration={1000}
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: 15
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Questrial"
              }}
            >
              1.5mm
            </Text>
          </View>
        </Animatable.View>

        <Animatable.View
          animation="fadeInLeft"
          duration={1000}
          style={{
            flex: 1,
            flexDirection: "row",
            paddingBottom: 3
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: 10
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Questrial",
                marginLeft: 5
              }}
            >
              Reponer
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "flex-end",
              marginRight: 15
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Questrial",
                fontWeight: "bold"
              }}
            >
              1.5mm
            </Text>
          </View>
        </Animatable.View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 3,
            flexDirection: "row"
          }}
        >
          <Button iconLeft small transparent>
            <Icon name="arrow-round-forward" />
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Questrial"
              }}
            >
              Ver Detalle
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default SalasInfoListAditional;
