import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  DeviceEventEmitter,
  ScrollView,
} from "react-native";
import Swipeable from "react-native-swipeable";
import _ from "lodash";

import MarcarProducto, { getQuestions, saveFeedbackQuestions, modalShow, modalHide, setCurrentProduct } from "@components/salas_info/salas_info_detal_action/Producto/ProductoAction";
import ModalFeedBack from "@components/salas_info/salas_info_detal_action/Producto/ProductoFeedback";

const styles = StyleSheet.create({
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10
  }
});

const leftButtons = [
  <TouchableOpacity
    activeOpacity={0.8}
    style={[styles.leftSwipeItem, { backgroundColor: "#f3bc32" }]}
  >
    <Text>Gestionar</Text>
    <Text>Caso</Text>
  </TouchableOpacity>
];

class Producto extends React.Component {
  static propTypes = {
    MarcarProducto: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
    modalHide: PropTypes.func.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    productos: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    saveFeedbackQuestions: PropTypes.func.isRequired,
    data: PropTypes.shape({
      cadem: PropTypes.oneOfType([() => null, PropTypes.string]),
      descripcion: PropTypes.string,
      ean: PropTypes.number,
      sventa: PropTypes.number,
      stock: PropTypes.number,
      stock_transito: PropTypes.oneOfType([() => null, PropTypes.number]),
      venta_perdida: PropTypes.number,
      gestionado: PropTypes.number
    }),
    flag: PropTypes.bool,
    accion: PropTypes.string,
    dateb2b: PropTypes.string,
    endpoint: PropTypes.string,
    sala: PropTypes.string,
    causa: PropTypes.string,
    categoria: PropTypes.string,
    visitaEnProgreso: PropTypes.number
  };

  static defaultProps = {
    flag: false,
    data: {
      cadem: null,
      descripcion: "",
      ean: 0,
      sventa: 0,
      stock: 0,
      stock_transito: "",
      venta_perdida: 0,
      gestionado: 0
    },
    accion: "",
    dateb2b: "",
    endpoint: "",
    sala: "",
    causa: "",
    categoria: "",
    visitaEnProgreso: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      swipeable: null,
      productos: {},
      questions: [],
      responseQuestions: []
    };
  }

  async componentWillMount() {
    const questions = await getQuestions(this.props.endpoint);
    this.setState({ questions });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.productos !== this.props.productos) {
      const dataProduct = nextProps.productos.detail.data.map(data => {
        if (!data.expirado) {
          return {
            ...data,
            expirado: false
          }
        }
        return {...data};
      });
      const productos = {
        detail: {
          ...nextProps.productos.detail,
          data: dataProduct
        }
      }
      this.setState({ productos });
    }
  }

  async onResponseQuestions(response) {
    const responseQuestions = this.state.questions.map(q => ({
      id: q.id,
      question: q.question,
      response: response[q.id] ? response[q.id] : false
    }));

    this.setState({ responseQuestions });
    this.makeGestionado();
  }

  updateProductByEan = (ean, gestionado) => {
    const { productos } = this.state;
    const updateData = productos.detail.data.map(data => {
      if (data.ean === ean) {
        return {
          ...data,
          gestionado
        }
      }
      return {...data};
    })

    const updateProduct = {
      detail: {
        ...productos.detail,
        data: updateData
      }
    }

    this.setState({
      productos: updateProduct
    })
  }

  makeGestionado = async () => {
    const caseId = await this.props.MarcarProducto(
      this.props.endpoint,
      this.props.currentProduct.sala,
      "gestionado",
      this.props.causa,
      this.props.currentProduct.ean,
      this.props.currentProduct.venta_perdida,
      this.props.currentProduct.dateb2b
    );

    this.updateProductByEan(this.props.currentProduct.ean, true);

    // modal
    if (this.state.responseQuestions.length > 0) {
      const dataFeedback = this.state.responseQuestions.map(elem => ({
        caseId,
        questionId: elem.id,
        folio: this.props.currentProduct.sala,
        ean: this.props.currentProduct.ean,
        answer: elem.response,
      }));
      await saveFeedbackQuestions(this.props.endpoint, dataFeedback, this.props.imagen);
    }

    // detiene
    DeviceEventEmitter.emit(
      `SalaDetalleCategoria-${this.props.currentProduct.sala}-${this.props.categoria.replace(
        /\s/g,
        ""
      )}`,
      { gestionado: this.props.currentProduct.venta_perdida }
    );

    DeviceEventEmitter.emit(`SalaDetalle-${this.props.currentProduct.sala}`, {
      gestionado: this.props.currentProduct.venta_perdida
    });

    this.props.modalHide();
  };

  caseFeedback = () => {
    this.props.modalShow();
  };

  render() {
    const {
      accion,
      /* productos, */
      visitaEnProgreso,
      isModalVisible,
    } = this.props;
    const {
      productos,
      questions,
    } = this.state;

    let visibilityText = false;
    if (accion === "Reponer" || accion === "Ajustar") {
      visibilityText = true;
    }
    
    if (_.isEmpty(productos) || questions.length === 0) {
      return (<View></View>)
    }

    return (
      <View>
        <ModalFeedBack
          questions={questions}
          showModal={isModalVisible}
          response={this.onResponseQuestions.bind(this)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <ScrollView>
        {productos.detail.data.map(data => {
          return (
            <Swipeable
              onRef={ref => {
                this.state.swipeable = ref;
              }}
              leftContent={
                !(Number(data.gestionado) !== 0) &&
                !data.expirado &&
                visitaEnProgreso === 1
                  ? leftButtons
                  // : leftButtons
                  // TODO: Para bloquear gestionados
                  : null
              }
              onLeftActionRelease={() => {
                this.props.setCurrentProduct(
                  data.descripcion,
                  data.ean,
                  this.props.sala,
                  this.props.dateb2b,
                  data.venta_perdida);
                this.caseFeedback();
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  backgroundColor: "#FFF",
                  borderBottomColor: "#DEDEDE",
                  borderBottomWidth: 1,
                  padding: 10,
                  paddingTop: 5
                }}
              >
                {(data.cadem === 1 || data.cadem === 0) && (
                  <Image
                    style={{
                      position: "absolute",
                      height: 100,
                      width: 100,
                      bottom: 0,
                      right: 0,
                      zIndex: 1000
                    }}
                    source={
                      data.cadem === 1 ?
                          require("@assets/images/thumb.png") :
                        data.cadem === 0 ?
                          require("@assets/images/thumb-down.png") : '' }
                  />
                )}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  {data.gestionado !== 0 &&
                    !data.expirado && (
                      <View
                        style={{
                          flex: 0.3,
                          backgroundColor: "#f3bc32",
                          padding: 3,
                          borderRadius: 5,
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 12,
                            fontWeight: "bold",
                            fontFamily: "Questrial"
                          }}
                        >
                          GESTIONADO
                        </Text>
                      </View>
                    )}

                  {!data.gestionado !== 0 &&
                    data.expirado && (
                      <View
                        style={{
                          flex: 0.3,
                          backgroundColor: "#ef4247",
                          padding: 3,
                          borderRadius: 5,
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 12,
                            fontWeight: "bold",
                            fontFamily: "Questrial",
                            color: "white"
                          }}
                        >
                          EXPIRADO
                        </Text>
                      </View>
                    )}

                  <View style={{ flex: 0.7, alignItems: "flex-end" }}>
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 12,
                        fontFamily: "Questrial"
                      }}
                    >
                      EAN : {data.ean}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: 5
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 16,
                      fontFamily: "Questrial"
                    }}
                  >
                    {data.descripcion}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: 5
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 12,
                      fontWeight: "bold",
                      fontFamily: "Questrial"
                    }}
                  >
                    Días sin venta: {data.sventa}
                  </Text>
                </View>
                {visibilityText && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginTop: 5
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: "bold",
                        fontFamily: "Questrial"
                      }}
                    >
                      Stock: {data.stock}
                    </Text>
                  </View>
                )}
                {productos.detail.flag && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginTop: 5
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: "bold",
                        fontFamily: "Questrial"
                      }}
                    >
                      Stock en transito: {data.stock_transito}
                    </Text>
                  </View>
                )}
              </View>
            </Swipeable>
          )
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  endpoint: state.user.endpoint,
  isModalVisible: state.productos.modal.isModalVisible,
  currentProduct: state.productos.currentProduct,
  imagen: state.productos.image.image,
});

const mapDispatchToProps = {
  MarcarProducto,
  modalShow,
  modalHide,
  setCurrentProduct,
  saveFeedbackQuestions
};

export default connect(mapStateToProps, mapDispatchToProps)(Producto);
