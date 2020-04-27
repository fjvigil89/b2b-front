import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  Container,
  View,
  Header,
  Left,
  Button,
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
  FooterTab,
} from 'native-base';

import StepIndicator from 'react-native-step-indicator';
import {
  SetValidForm,
  ChangeInput,
  GetPoll,
  SavePoll,
} from '@components/polls/PollsActions';
import PollsCheckBox from '@components/polls/polls_check_box/PollsCheckBox';
import PollsRadio from '@components/polls/polls_radio/PollsRadio';
import LoadingOverlay from '@common/loading_overlay/LoadingOverlay';
import GetListPoll from '@components/polls/polls_list/PollsListActios';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

class Polls extends Component {
  static propTypes = {
    SetValidForm: PropTypes.func.isRequired,
    GetListPoll: PropTypes.func.isRequired,
    ChangeInput: PropTypes.func.isRequired,
    GetPoll: PropTypes.func.isRequired,
    SavePoll: PropTypes.func.isRequired,
    position: PropTypes.number,
    isError: PropTypes.bool,
    msg: PropTypes.string,
    value: PropTypes.oneOfType([() => null, PropTypes.any]),
    dataPoll: PropTypes.oneOfType([() => null, PropTypes.any]),
    lengthPoll: PropTypes.number,
    isLoading: PropTypes.bool,
    isFinish: PropTypes.bool,
    idPoll: PropTypes.number,
    form: PropTypes.oneOfType([() => null, PropTypes.any]),
    endpoint: PropTypes.string,
    paramsPoll: PropTypes.string,
  };

  static defaultProps = {
    position: 0,
    value: null,
    form: null,
    isError: false,
    msg: '',
    dataPoll: [],
    lengthPoll: 0,
    isLoading: true,
    isFinish: false,
    idPoll: 0,
    endpoint: '',
    paramsPoll: '',
  };

  componentWillMount = () => {
    this.props.GetPoll(this.props.endpoint, this.props.idPoll);
  };

  getContent = (position) => {
    if (this.props.lengthPoll === this.props.position) {
      return (
        <Content>
          <Card>
            <CardItem header>
              <Button transparent onPress={Actions.pop}>
                <Text>Encuesta finalizada</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      );
    }

    return (
      <Content>
        <View style={{ paddingVertical: 30 }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={position}
            stepCount={this.props.lengthPoll}
          />
        </View>
        <Card>
          <CardItem header>
            <Text>{this.props.dataPoll[position].title}</Text>
          </CardItem>
          {this.getForm(this.props.dataPoll[position], position)}

          <CardItem footer>
            <Text style={{ color: 'red' }}>{this.errors()}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  };

  getForm = (data, position) => {
    if (data.type === 'textarea') {
      return (
        <View style={{ margin: 10 }}>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Textarea"
            onChangeText={(v) => this.props.ChangeInput({ value: v, position })}
            value={this.props.value}
          />
        </View>
      );
    } else if (data.type === 'radio') {
      return <PollsRadio data={data} position={position} />;
    } else if (data.type === 'input') {
      return (
        <View style={{ margin: 10 }}>
          <Input
            style={{ height: 35, borderColor: 'gray', borderWidth: 1 }}
            autoCapitalize="none"
            value={this.props.value}
            onChangeText={(v) => this.props.ChangeInput({ value: v, position })}
          />
        </View>
      );
    }

    return <PollsCheckBox data={data} position={position} />;
  };

  getFooter = () => {
    if (
      (this.props.lengthPoll === 1 && this.props.position === 0) ||
      (this.props.lengthPoll === this.props.position + 1 &&
        this.props.position === 0)
    ) {
      return (
        <Footer>
          <FooterTab>
            <Button onPress={this.closed}>
              <Text>Cancelar</Text>
            </Button>
            <Button active onPress={this.finish}>
              <Text>Finalizar</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    } else if (
      this.props.position === 0 &&
      this.props.lengthPoll > this.props.position + 1
    ) {
      return (
        <Footer>
          <FooterTab>
            <Button onPress={this.closed}>
              <Text>Cancelar</Text>
            </Button>
            <Button onPress={this.nextPosition}>
              <Text>Siguiente</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    } else if (this.props.lengthPoll > this.props.position + 1) {
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
    } else if (this.props.lengthPoll === this.props.position + 1) {
      return (
        <Footer>
          <FooterTab>
            <Button onPress={this.previousPosition}>
              <Text>Anterior</Text>
            </Button>
            <Button active onPress={this.finish}>
              <Text>Finalizar</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }

    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.closed} active>
            <Text>Cerrar</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  };

  savePoll = () => {
    this.props.SavePoll(this.props.endpoint, this.props.form);
  };

  nextPosition = () => {
    this.props.SetValidForm({
      position: this.props.position,
      type: 'NEXT_POSITION',
    });
  };

  previousPosition = () => {
    if (this.props.position > 0) {
      this.props.SetValidForm({
        position: this.props.position,
        type: 'PREVIOUS_POSITION',
      });
    }
  };

  closed = () => {
    this.props.GetListPoll(this.props.paramsPoll);
    Actions.pop({ refresh: true });
  };

  finish = () => {
    if (this.props.position > 0 || this.props.lengthPoll === 1) {
      this.props.SetValidForm({
        position: this.props.position,
        type: 'FINISH',
      });
    }
  };

  errors = () => (this.props.isError ? this.props.msg : '');

  render = () => {
    const { position, isLoading, isFinish } = this.props;

    if (isLoading) {
      return <LoadingOverlay />;
    } else if (isFinish) {
      this.savePoll();

      return <LoadingOverlay />;
    }
    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left />
          <Body>
            <Title>Encuestas</Title>
          </Body>
          <Right />
        </Header>

        {this.getContent(position)}
        {this.getFooter()}
      </Container>
    );
  };
}

const mapStateToProps = (state) => ({
  position: state.polls.position,
  value: state.polls.value,
  isError: state.polls.isError,
  msg: state.polls.msg,
  dataPoll: state.polls.dataPoll,
  lengthPoll: state.polls.lengthPoll,
  isLoading: state.polls.isLoading,
  isFinish: state.polls.isFinish,
  form: state.polls.form,
  endpoint: state.user.endpoint,
});

const mapDispatchToProps = {
  SetValidForm,
  ChangeInput,
  GetPoll,
  SavePoll,
  GetListPoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
