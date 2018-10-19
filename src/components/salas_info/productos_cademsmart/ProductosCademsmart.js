import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, ScrollView, StatusBar, SafeAreaView } from "react-native";
import {
  Container,
  Button,
  Text,
  Content,
  Footer,
  FooterTab
} from "native-base";
import { Actions } from "react-native-router-flux";
import _ from "lodash";

import ListadoProductosCademsmart from "@components/salas_info/productos_cademsmart/ProductosCademsmartActions";
import HeaderCademsmart from "@components/salas_info/productos_cademsmart/header_cademsmart/HeaderCademsmart";
import ProductoCademsmart from "@components/salas_info/productos_cademsmart/producto_cademsmart/ProductoCademsmart";

class ProductosCademsmart extends React.Component {
  static propTypes = {
    ListadoProductosCademsmart: PropTypes.func.isRequired,
    productos: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    porcentaje: PropTypes.string,
    visita: PropTypes.number,
    nombreSala: PropTypes.string,
    direccion: PropTypes.string,
    ultimaMedicion: PropTypes.string,
    endpoint: PropTypes.string
  };

  static defaultProps = {
    porcentaje: "",
    visita: 0,
    nombreSala: "",
    direccion: "",
    ultimaMedicion: "",
    endpoint: ""
  };

  componentWillMount = () => {
    this.props.ListadoProductosCademsmart(
      this.props.endpoint,
      this.props.visita
    );
  };

  render() {
    let productos = <Text />;

    if (!_.isEmpty(this.props.productos)) {
      productos = this.props.productos.map(detail => (
        <ProductoCademsmart key={detail.ean} data={detail} />
      ));
    }

    return (
      <Container style={{ backgroundColor: "#F4F4F4" }}>
        <StatusBar barStyle="dark-content" />
        <Content
          style={{ flex: 1, backgroundColor: "#FFF" }}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fdf7c6" }}>
            <HeaderCademsmart
              porcentaje={this.props.porcentaje}
              nombreSala={this.props.nombreSala}
              direccion={this.props.direccion}
              ultimaMedicion={this.props.ultimaMedicion}
            />

            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF"
              }}
            >
              <ScrollView>{productos}</ScrollView>
            </View>
          </SafeAreaView>
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

const mapStateToProps = state => ({
  productos: state.productosCademsmart.productos,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  ListadoProductosCademsmart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductosCademsmart);
