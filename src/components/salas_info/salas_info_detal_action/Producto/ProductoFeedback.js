import React, { Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  CheckBox,
  Alert,
} from 'react-native';
import {
  Text,
  Input
} from "native-base";
import Modal from "react-native-modal";
import _ from "lodash";

export default class ModalFeedBack extends Component {

  state = {
    questions: this.props.questions,
    response: {},
  };

  takePhoto = () => {
    Alert.alert('Tomar Foto');
  }

  onChecked = (idQuestion) => {
    const newCheck = {...this.state.response};
    newCheck[idQuestion] = !newCheck[idQuestion];
    this.setState({ response: newCheck });
  }

  handleInput = (idQuestion, text) => {
    const newCheck = {...this.state.response};
    newCheck[idQuestion] = text;
    this.setState({ response: newCheck });
  }

  render() {
    let questionList = <View></View>;
    if (!_.isEmpty(this.props.questions)) {
      questionList = this.props.questions.map(q => {
        if (q.id === 7) { // Comentario
          return (
            <View>
              <Text>{q.question}</Text>
              <Input placeholder='Ingrese comentario (opcional)' value={this.state.response[q.id]} onChangeText={text => this.handleInput(q.id, text)}/>
            </View>
          )
        }
  
        if ([1,2,3,4,5,6].includes(q.id)) {
          return (
            <View>
              <Text>{q.question}</Text>
              <CheckBox key={q.id} value={this.state.response[q.id]} onChange={() => this.onChecked(q.id)} />
            </View>
          )
        }
      })
    }

    return (
      <Modal style={styles.container} isVisible={this.props.showModal}>
        <View style={styles.content}>
          <ScrollView>
           {questionList}
          </ScrollView>
          <View styles={{flexDirection: "row"}}>
            <Button title="Foto" onPress={() => this.takePhoto()} />
            <Button title="Responder Feedback" onPress={() => this.props.response(this.state.response)} />
          </View>
        </View>
      </Modal>
    );
  }
}

const QuestionList = (props) => {
  return this.props.questions.map(q => {
    if (q.id === 7) { // Comentario
      return (
        <View>
          <Text>{q.question}</Text>
          <Input placeholder='Ingrese comentario (opcional)' value={this.state.response[q.id]} onChangeText={text => this.handleInput(q.id, text)}/>
        </View>
      )
    }

    if ([1,2,3,4,5,6].includes(q.id)) {
      return (
        <View>
          <Text>{q.question}</Text>
          <CheckBox key={q.id} value={this.state.response[q.id]} onChange={() => this.onChecked(q.id)} />
        </View>
      )
    }
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 30 / 2,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
});
