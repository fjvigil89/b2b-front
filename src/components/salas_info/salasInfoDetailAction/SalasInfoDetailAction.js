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

import ListadoProductosPorCategoriaAcccion
  from "@components/salas_info/salasInfoDetailAction/SalasInfoDetailActionActions.js";
import Header from "@components/salas_info/salasInfoDetailAction/Header/Header";
import Producto from "@components/salas_info/salasInfoDetailAction/Producto/Producto";

class SalasInfoDetailAction extends React.Component {
  static propTypes = {
    ListadoProductosPorCategoriaAcccion: PropTypes.func.isRequired,
    productos: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    accion: PropTypes.string,
    monto: PropTypes.string,
    sala: PropTypes.string,
    nombreSala: PropTypes.string,
    categoria: PropTypes.string,
    dateb2b: PropTypes.string,
    endpoint: PropTypes.string,
    visitaEnProgreso: PropTypes.number
  };

  static defaultProps = {
    accion: "",
    monto: "",
    sala: "",
    nombreSala: "",
    categoria: "",
    dateb2b: "",
    endpoint: "",
    visitaEnProgreso: 0
  };

  componentWillMount = () => {
    const {
      endpoint,
      sala,
      categoria,
      accion
    } = this.props;
    this.props.ListadoProductosPorCategoriaAcccion(
      endpoint,
      sala,
      categoria,
      accion
    );
  };

  render() {
    // let productos = <Text/>;

    /* if (!_.isEmpty(this.props.productos)) {
      productos = this.props.productos.detail.data.map(detail => (
        <Producto
          sala={this.props.sala}
          causa={this.props.accion}
          key={detail.ean}
          data={detail}
          flag={this.props.productos.detail.flag}
          accion={this.props.accion}
          dateb2b={this.props.dateb2b}
          categoria={this.props.categoria}
          visitaEnProgreso={this.props.visitaEnProgreso}
        />
      ));
    } */

    return (
      <Container style={{ backgroundColor: "#F4F4F4" }}>
        <StatusBar barStyle="dark-content"/>
        <Content
          style={{ flex: 1, backgroundColor: "#FFF" }}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fdf7c6" }}>
            <Header
              accion={this.props.accion}
              monto={this.props.monto}
              nombreSala={this.props.nombreSala}
              categoria={this.props.categoria}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF"
              }}
            >
              <Producto
                sala={this.props.sala}
                causa={this.props.accion}
                /* key={detail.ean} */
                productos={this.props.productos}
                /* data={detail}
                flag={this.props.productos.detail.flag} */
                accion={this.props.accion}
                dateb2b={this.props.dateb2b}
                categoria={this.props.categoria}
                visitaEnProgreso={this.props.visitaEnProgreso}
              />
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
  productos: state.productos.productos,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  ListadoProductosPorCategoriaAcccion
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SalasInfoDetailAction
);
