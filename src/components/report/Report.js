import React, { Component } from "react";
import PropTypes from "prop-types";
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
  Text,
  Content,
  View
} from "native-base";
import { Actions } from "react-native-router-flux";
import { Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import ReportePorTipo from "@components/report/ReportActions";

class Report extends Component {
  static propTypes = {
    ReportePorTipo: PropTypes.func.isRequired,
    endpoint: PropTypes.string,
    info: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    endpoint: "",
    info: []
  };

  constructor(props) {
    super(props);

    this.state = {
      aditionalPanelFirst: false,
      aditionalPanelSecond: false,
      buttonCollapsedFirst: false,
      buttonCollapsedSecond: false,
      hoyActive: true,
      semanaActive: false,
      mesActive: false
    };
  }

  componentWillMount = () => {
    this.props.ReportePorTipo(this.props.endpoint, "day");
  };

  render = () => {
    const backgroundImage = require("@assets/images/background-detalle-sala-categoria.png");

    console.log(this.props.info);

    return (
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
        <Content style={{}}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              paddingBottom: 0,
              backgroundColor: "#FFFFFF"
            }}
          >
            {this.state.hoyActive ? (
              <Button
                small
                bordered
                style={{ flex: 0.33, justifyContent: "center" }}
                onPress={() => {
                  this.setState({
                    hoyActive: true,
                    semanaActive: false,
                    mesActive: false
                  });
                }}
              >
                <Text>Hoy</Text>
              </Button>
            ) : (
              <Button
                small
                transparent
                style={{ flex: 0.33, justifyContent: "center" }}
                onPress={() => {
                  this.setState({
                    hoyActive: true,
                    semanaActive: false,
                    mesActive: false
                  });
                }}
              >
                <Text>Hoy</Text>
              </Button>
            )}

            {this.state.semanaActive ? (
              <Button
                small
                bordered
                style={{ flex: 0.33, justifyContent: "center" }}
                onPress={() => {
                  this.setState({
                    hoyActive: false,
                    semanaActive: true,
                    mesActive: false
                  });
                }}
              >
                <Text>Semana</Text>
              </Button>
            ) : (
              <Button
                small
                transparent
                style={{ flex: 0.33, justifyContent: "center" }}
                onPress={() => {
                  this.setState({
                    hoyActive: false,
                    semanaActive: true,
                    mesActive: false
                  });
                }}
              >
                <Text>Semana</Text>
              </Button>
            )}

            {this.state.mesActive ? (
              <Button
                small
                bordered
                style={{ flex: 0.33, justifyContent: "center" }}
                onPress={() => {
                  this.setState({
                    hoyActive: false,
                    semanaActive: false,
                    mesActive: true
                  });
                }}
              >
                <Text>Mes</Text>
              </Button>
            ) : (
              <Button
                small
                transparent
                style={{ flex: 0.33, justifyContent: "center" }}
                onPress={() => {
                  this.setState({
                    hoyActive: false,
                    semanaActive: false,
                    mesActive: true
                  });
                }}
              >
                <Text>Mes</Text>
              </Button>
            )}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 5,
              backgroundColor: "#FFFFFF"
            }}
          >
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                margin: 10,
                borderRadius: 5,
                borderColor: "green",
                borderWidth: 2,
                height: 100
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
                  name="md-trophy"
                  style={{
                    fontSize: 50,
                    color: "green"
                  }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "Questrial",
                    color: "green"
                  }}
                >
                  56.7m
                </Text>

                <Text
                  style={{
                    marginTop: 2,
                    fontFamily: "Questrial",
                    fontSize: 12
                  }}
                >
                  Total de Ventas
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                margin: 10,
                borderRadius: 5,
                borderColor: "red",
                borderWidth: 2,
                height: 100
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
                  name="md-stats"
                  style={{
                    fontSize: 50,
                    color: "red"
                  }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "Questrial",
                    color: "red"
                  }}
                >
                  56.7m
                </Text>

                <Text
                  style={{
                    marginTop: 2,
                    fontFamily: "Questrial",
                    fontSize: 12
                  }}
                >
                  Venta Perdida
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Bree",
                  fontWeight: "bold",
                  marginBottom: 0
                }}
              >
                Detalle de Reporte
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#FFF",
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: 1
              }}
            >
              <View
                style={{
                  flex: 0.25,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ height: 75, width: 75 }}
                  source={require("@assets/images/jumbo.png")}
                />
              </View>

              <View
                style={{
                  flex: 0.75,
                  borderLeftColor: "#DEDEDE",
                  borderLeftWidth: 1
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    borderBottomColor: "#DEDEDE",
                    borderBottomWidth: 1,
                    paddingTop: 10,
                    paddingBottom: 10
                  }}
                  onPress={() => {
                    this.setState({
                      aditionalPanelFirst: !this.state.aditionalPanelFirst,
                      buttonCollapsedFirst: !this.state.buttonCollapsedFirst
                    });
                  }}
                >
                  <View
                    style={{
                      flex: 0.4,
                      justifyContent: "center",
                      alignItems: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Questrial",
                        color: "green"
                      }}
                    >
                      15.3 MM
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginLeft: 15
                    }}
                  >
                    <Icon
                      name="md-arrow-round-up"
                      style={{
                        fontSize: 20,
                        color: "green"
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Questrial",
                        marginLeft: 10,
                        color: "green"
                      }}
                    >
                      18%
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {this.state.buttonCollapsedFirst ? (
                      <Icon
                        name="ios-arrow-down-outline"
                        style={{
                          fontSize: 20
                        }}
                      />
                    ) : (
                      <Icon
                        name="ios-arrow-forward-outline"
                        style={{
                          fontSize: 20
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {this.state.aditionalPanelFirst && (
                  <Animatable.View
                    animation="fadeInRight"
                    duration={1000}
                    style={{
                      flex: 1,
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

                    <View style={{ flex: 1, paddingBottom: 10, paddingTop: 5 }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Salas cerradas
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            30%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Salas nuevas
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Productos descatalogados
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Productos nuevos
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Mismas salas / Mismos productos
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Animatable.View>
                )}

                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    borderBottomColor: "#DEDEDE",
                    borderBottomWidth: 1,
                    paddingTop: 10,
                    paddingBottom: 10
                  }}
                  onPress={() => {
                    this.setState({
                      aditionalPanelSecond: !this.state.aditionalPanelSecond,
                      buttonCollapsedSecond: !this.state.buttonCollapsedSecond
                    });
                  }}
                >
                  <View
                    style={{
                      flex: 0.4,
                      justifyContent: "center",
                      alignItems: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Questrial",
                        color: "red"
                      }}
                    >
                      15.3 MM
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginLeft: 15
                    }}
                  >
                    <Icon
                      name="md-arrow-round-down"
                      style={{
                        fontSize: 20,
                        color: "red"
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Questrial",
                        marginLeft: 10,
                        color: "red"
                      }}
                    >
                      18%
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {this.state.buttonCollapsedSecond ? (
                      <Icon
                        name="ios-arrow-down-outline"
                        style={{
                          fontSize: 20
                        }}
                      />
                    ) : (
                      <Icon
                        name="ios-arrow-forward-outline"
                        style={{
                          fontSize: 20
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {this.state.aditionalPanelSecond && (
                  <Animatable.View
                    animation="fadeInRight"
                    duration={1000}
                    style={{
                      flex: 1,
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

                    <View style={{ flex: 1, paddingBottom: 10, paddingTop: 5 }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Salas cerradas
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            30%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Salas nuevas
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Productos descatalogados
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Productos nuevos
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: 5,
                          paddingBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Questrial"
                            }}
                          >
                            100%
                          </Text>
                        </View>
                        <View style={{ flex: 0.8, marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Questrial"
                            }}
                          >
                            Mismas salas / Mismos productos
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Animatable.View>
                )}
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  info: state.reporte.info,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  ReportePorTipo
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
