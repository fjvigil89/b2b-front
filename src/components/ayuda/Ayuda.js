import React from 'react';
import { View, StatusBar, Platform, Image } from 'react-native';
import {
  Container,
  Text,
  Body,
  Title,
  Header,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import AyudaDefault from './Renders/Default';
import AyudaMedicion from './Renders/Medicion';
import AyudaReport from './Renders/Report';

const platform = Platform.OS;

class Ayuda extends React.Component {
  renderAyuda = () => {
    switch (this.props.data) {
      // case 'medicion':
      //   return <AyudaMedicion />;
      case 'report':
        return <AyudaReport />;
      default:
        return <AyudaDefault />;
    }
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#FFFFFF' }}>
        <StatusBar barStyle="dark-content" />
        <Header
          style={{
            borderBottomWidth: 0,
            backgroundColor: '#F4F4F4',
          }}
          iosBarStyle="dark-content"
          hasTabs
        >
          <Body>
            <Title
              style={{
                fontSize: 14,
                color: platform === 'android' ? '#FFF' : '#000',
              }}
            >
              AYUDA
            </Title>
          </Body>
        </Header>
        {this.renderAyuda()}
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

export default Ayuda;
