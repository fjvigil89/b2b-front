import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Button,
  Text,
  Input,
  Switch,
  Left,
  Right,
  Item,
  ListItem,
  Icon,
} from 'native-base';
import Modal from 'react-native-modal';
import _ from 'lodash';
import { MaterialIcons } from '@expo/vector-icons';

import {
  modalHide,
  setPhoto,
} from '@components/salas_info/salasInfoDetailAction/Producto/ProductoAction';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 500,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30 / 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  view: {
    borderColor: '#fff',
    paddingBottom: 10,
  },
  itemHeader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemHeaderIcon: {
    color: 'black',
    fontSize: 30,
    marginTop: -40,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Questrial',
  },
  buttonIcon: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Questrial',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    margin: 20,
  },
  button: {
    borderRadius: 30 / 2,
    width: 120,
    justifyContent: 'center',
  },
});

class ModalFeedBack extends Component {
  state = {
    questions: this.props.questions,
    response: {},
    images: '',
    comment: '',
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const permissionsCamera = Permissions.CAMERA;

    const gallery = await Permissions.askAsync(permissions);
    const camera = await Permissions.askAsync(permissionsCamera);

    if (gallery.status !== 'granted' || camera.status !== 'granted') {
      Alert.alert('Disculpa, la Camara requiere de estos permisos para operar');
      return false;
    }
    return true;
  };

  takePhoto = async () => {
    const checkpermission = await this.getPermissionAsync();
    if (!checkpermission) {
      Alert.alert('Disculpa, la Camara requiere de estos permisos para operar');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ base64: true });

    if (!result.cancelled) {
      const filename = result.uri.split('/').pop();
      result.name = filename;

      this.handleInput(8, result.name);
      this.props.setPhoto(result);
      this.setState({ images: result });
    }
  };

  handleInput = (idQuestion, val) => {
    const newCheck = { ...this.state.response };
    newCheck[idQuestion] = val;
    this.setState({ response: newCheck });
  };

  render() {
    const { questions } = this.props;
    let questionList = <View></View>;
    if (!_.isEmpty(questions)) {
      questionList = questions.map((q) => {
        if (q.id === 7) {
          // Comentario
          return (
            <View style={{ padding: 20 }} key={JSON.stringify(q.id)}>
              <Text style={styles.text}>{q.question}</Text>
              <Item>
                <Input
                  placeholder="Ingrese comentario (opcional)"
                  onChangeText={(val) => {
                    this.handleInput(q.id, val);
                    this.setState({ comment: val });
                  }}
                  value={this.state.comment}
                />
                <Icon name="checkmark-circle" />
              </Item>
            </View>
          );
        }

        if ([1, 2, 3, 4, 5, 6].includes(q.id)) {
          return (
            <View key={JSON.stringify(q.id)}>
              <ListItem style={{ flexDirection: 'row' }}>
                <Left
                  style={{
                    flex: 6,
                    justifyContent: 'flex-start',
                  }}
                >
                  <Text style={[styles.text]}>{q.question}</Text>
                </Left>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Switch
                    key={q.id}
                    onValueChange={(val) => this.handleInput(q.id, val)}
                    value={this.state.response[q.id]}
                  />
                </View>
              </ListItem>
            </View>
          );
        }
      });
    }

    return (
      <Modal style={styles.container} isVisible={this.props.showModal}>
        <View style={styles.content}>
          <View
            style={[
              styles.itemHeader,
              {
                paddingBottom: 15,
              },
            ]}
          >
            <Left
              style={
                {
                  // marginRight: 5
                }
              }
            >
              <View>
                <Text
                  style={{
                    marginLeft: 5,
                    marginTop: 15,
                    fontSize: 20,
                    fontFamily: 'Questrial',
                  }}
                >
                  {this.props.currentProduct.description}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 12,
                    fontFamily: 'Questrial',
                  }}
                >
                  EAN: {this.props.currentProduct.ean}
                </Text>
              </View>
            </Left>
            <Right>
              <Button
                transparent
                title=""
                onPress={() => {
                  this.props.modalHide();
                  this.setState({
                    questions: [],
                    response: {},
                    images: '',
                  });
                }}
              >
                <MaterialIcons name="close" style={styles.itemHeaderIcon} />
              </Button>
            </Right>
          </View>
          <ScrollView>{questionList}</ScrollView>
          <View style={styles.containerButtons}>
            <View style={styles.buttonContainer}>
              <Button onPress={this.takePhoto} style={styles.button}>
                <MaterialIcons style={styles.buttonIcon} name="camera-alt" />
                <Text>Foto</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  this.props.response(this.state.response);
                  this.setState({
                    questions: [],
                    response: {},
                    images: '',
                  });
                }}
                style={styles.button}
              >
                <Text>Responder</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalVisible: state.productos.modal.isModalVisible,
  currentProduct: state.productos.currentProduct,
});

const mapDispatchToProps = {
  modalHide,
  setPhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalFeedBack);
