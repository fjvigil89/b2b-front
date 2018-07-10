import React, { Component } from "react";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  Container,
  View,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Body,
  Right,
  Text,
  Card,
  CardItem,
  Textarea,
  Input,
  Content,
  Footer,
  FooterTab
} from "native-base";

import StepIndicator from "react-native-step-indicator";
import {
  SetCurrentPosition,
  SetValidForm,
  ChangeInput
} from "@components/polls/PollsActions";
import PollsCheckBox from "@components/polls/polls_check_box/PollsCheckBox";
import PollsRadio from "@components/polls/polls_radio/PollsRadio";

const dummyData = [
  {
    step: 1,
    title: "Cuales son sus colores favoritos? ",
    type: "checkbox",
    config: [
      {
        id: 14,
        text: "Azul"
      },
      {
        id: 26,
        text: "Rojo"
      },
      {
        id: 1,
        text: "Amarillo"
      },
      {
        id: 23,
        text: "Verde"
      },
      {
        id: 9,
        text: "Negro"
      },
      {
        id: 2,
        text: "Verde"
      }
    ]
  },
  {
    step: 2,
    title: "Usted está conforme con el desarrollo de B2B ?",
    type: "textarea",
    config: []
  },

  {
    step: 3,
    title: "Le gusta la fluides de la apps? ",
    type: "radio",
    config: [
      {
        id: 14,
        text: "Si",
        config: {
          title: "¿Por qué si?",
          textArea: true
        }
      },
      {
        id: 2,
        text: "No",
        config: {
          title: "",
          textArea: false
        }
      }
    ]
  },
  {
    step: 4,
    title: "Cuantas personas? ",
    type: "radio",
    config: [
      {
        id: 14,
        text: "Si",
        config: {
          title: "",
          textArea: false
        }
      },
      {
        id: 2,
        text: "No",
        config: {
          title: "Detalle sobre el porque no",
          textArea: true
        }
      }
    ]
  },
  {
    step: 5,
    title: "¿Cuál es su nombre?",
    type: "input",
    config: []
  },
  {
    step: 6,
    title: "¿Cuál es su nombre?",
    type: "input",
    config: []
  }
];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013"
};

class Polls extends Component {
  static propTypes = {
    SetCurrentPosition: PropTypes.func.isRequired,
    SetValidForm: PropTypes.func.isRequired,
    ChangeInput: PropTypes.func.isRequired,
    position: PropTypes.number,
    isError: PropTypes.bool,
    value: PropTypes.oneOfType([() => null, PropTypes.any])
  };

  static defaultProps = {
    position: 0,
    value: null,
    isError: false
  };

  state = {
    lengthData: false
  };

  componentWillMount = () => {
    this.setState({
      lengthData: dummyData.length
    });
  };

  getContent = (data, position) => {
    if (data.type === "textarea") {
      return (
        <View style={{ margin: 10 }}>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Textarea"
            onChangeText={v => this.props.ChangeInput({ value: v, position })}
            value={this.props.value}
          />
        </View>
      );
    } else if (data.type === "radio") {
      return <PollsRadio data={data} position={position} />;
    } else if (data.type === "input") {
      return (
        <View style={{ margin: 10 }}>
          <Input
            style={{ height: 35, borderColor: "gray", borderWidth: 1 }}
            autoCapitalize="none"
            value={this.props.value}
            onChangeText={v => this.props.ChangeInput({ value: v, position })}
          />
        </View>
      );
    }

    return <PollsCheckBox data={data} position={position} />;
  };

  getButtonSend = (lengthData, index) => {
    if (lengthData - 1 === index) {
      return (
        <View
          style={{
            paddingRight: 15,
            paddingTop: 30,
            flex: 1,
            alignSelf: "flex-end"
          }}
        >
          <Button
            onPress={() => {
              // Send form
            }}
          >
            <Text>Enviar encuesta</Text>
          </Button>
        </View>
      );
    }

    return null;
  };
  getFooter = () => {
    if (this.state.lengthData - 1 === this.props.position) {
      return (
        <Footer>
          <FooterTab>
            <Button onPress={this.previousPosition}>
              <Text>Anterior</Text>
            </Button>
            <Button active>
              <Text>Finalizar</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    } else if (this.props.position === 0) {
      return (
        <Footer>
          <FooterTab>
            <Button>{}</Button>
            <Button onPress={this.nextPosition}>
              <Text>Siguiente</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }

    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.previousPosition}>
            <Text>Anterior</Text>
          </Button>
          <Button onPress={this.nextPosition}>
            <Text>Siguiente</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  };
  nextPosition = () => {
    this.props.SetValidForm({
      position: this.props.position + 1,
      type: "NEXT_POSITION"
    });
  };

  previousPosition = () => {
    if (this.props.position > 0) {
      this.props.SetCurrentPosition(this.props.position - 1);
    }
  };

  errors = () => (this.props.isError ? "* Debe completar el formulario" : "");

  render = () => {
    const { position } = this.props;

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Encuestas</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <View style={{ paddingVertical: 30 }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={position}
            />
          </View>
          <Card>
            <CardItem header>
              <Text>{dummyData[position].title}</Text>
            </CardItem>
            {this.getContent(dummyData[position], position)}

            <CardItem footer>
              <Text style={{ color: "red" }}>{this.errors()}</Text>
            </CardItem>
          </Card>
        </Content>
        {this.getFooter()}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  position: state.polls.position,
  value: state.polls.value,
  isError: state.polls.isError
});

const mapDispatchToProps = {
  SetCurrentPosition,
  SetValidForm,
  ChangeInput
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Polls);
