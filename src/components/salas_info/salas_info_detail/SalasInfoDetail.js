import React from "react";
import { View, Image, Dimensions } from "react-native";
import { Text, Thumbnail } from "native-base";

class SalasInfoDetail extends React.Component {
  render() {
    const backgroundImage = require("@assets/images/background-detalle-salas.png");
    const logo = require("@assets/images/jumbo.png");

    const deviceFullWidth = Dimensions.get("window").width;
    const deviceWidth = deviceFullWidth - 30;

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{
            position: "absolute",
            top: 0,
            width: deviceFullWidth,
            height: 180
          }}
          source={backgroundImage}
        />

        <View
          style={{
            flex: 1,
            marginTop: 5,
            width: deviceWidth,
            alignItems: "flex-start"
          }}
        >
          <Text
            style={{
              fontSize: 23,
              fontFamily: "Bree",
              fontWeight: "bold",
              color: "#FFF"
            }}
          >
            Jumbo Costanera Center
          </Text>
        </View>

        <Thumbnail
          style={{ position: "absolute", top: 0, right: 15, zIndex: 1000 }}
          large
          source={logo}
        />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            width: deviceWidth
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#FFF",
              fontFamily: "Questrial",
              marginBottom: 5
            }}
          >
            Vicente Huidobro 4600, Santiago
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#FFF",
              fontWeight: "bold",
              fontFamily: "Questrial"
            }}
          >
            Actualización B2B : 12 de Febrero de 1984
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#FFF",
              fontWeight: "bold",
              fontFamily: "Questrial"
            }}
          >
            Ult. medición Cadem : 13 de Noviembre de 2017
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10
          }}
        >
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 5,
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              borderLeftColor: "#DEDEDE",
              borderLeftWidth: 1
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                fontFamily: "Questrial"
              }}
            >
              50%
            </Text>
            <Text style={{ fontFamily: "Questrial", fontSize: 12 }}>
              CademSmart
            </Text>
          </View>

          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 5,
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              borderRightColor: "#DEDEDE",
              borderRightWidth: 1,
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                fontFamily: "Questrial"
              }}
            >
              1.4mm
            </Text>
            <Text style={{ fontFamily: "Questrial", fontSize: 12 }}>
              Venta Perdida
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10
          }}
        >
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              paddingBottom: 2
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Bree",
                fontWeight: "bold"
              }}
            >
              Categoria
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              paddingBottom: 2
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Bree",
                fontWeight: "bold"
              }}
            >
              Casos
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              paddingBottom: 2
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Bree",
                fontWeight: "bold"
              }}
            >
              Venta Perdida
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SalasInfoDetail;
