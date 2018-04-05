import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Text,
  Content,
  Footer,
  FooterTab
} from 'native-base';
import { View, Dimensions, Image } from 'react-native';

// Components
import LoginScreen from '@components/login/Login';
import Loading from '@components/loading//Loading';
import SalasHeader from '@components/salas/salas_header/SalasHeader';
import SalasList from '@components/salas/salas_list/SalasList';
import { SetToken } from '@components/login/LoginActions.js';

class Dashboard extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    SetToken: PropTypes.func.isRequired
  };

  static defaultProps = {
    isAuthenticated: false,
    isLoading: true
  };

  componentWillMount = () => {
    this.props.SetToken();
  };

  render = () => {
    const { isAuthenticated, isLoading } = this.props;
    if (!isAuthenticated) {
      return <LoginScreen />;
    } else if (isLoading) {
      return <Loading />;
    }

    const deviceFullWidth = Dimensions.get('window').width;
    const deviceWidth = deviceFullWidth - 30;

    const backgroundImage = require('@assets/images/background-detalle-accion.png');

    return (
      <Container>
        <Content
          style={{ flex: 1, backgroundColor: '#FFF' }}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 150
            }}
          >
            <Image
              style={{
                position: 'absolute',
                top: 0,
                width: deviceFullWidth
              }}
              source={backgroundImage}
            />

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: deviceWidth
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Questrial',
                  fontWeight: 'bold',
                  marginBottom: 15,
                  marginTop: 50
                }}
              >
                Jumbo Costanera Center
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Questrial'
                }}
              >
                Categoria : Chocolates
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Questrial',
                  marginTop: 5
                }}
              >
                Acción : Reponer
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomColor: '#DEDEDE',
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Bree',
                    fontWeight: 'bold',
                    marginBottom: 0
                  }}
                >
                  Categoria
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomColor: '#DEDEDE',
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Bree',
                    fontWeight: 'bold'
                  }}
                >
                  Casos
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottomColor: '#DEDEDE',
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Bree',
                    fontWeight: 'bold'
                  }}
                >
                  Venta Perdida
                </Text>
              </View>
            </View>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button full light>
              <Text>Cerrar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
    /*
    return (
      <Container>
        <SalasHeader />
        <SalasList />
      </Container>
    );
    */
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.messages.loading
});

const mapDispatchToProps = {
  SetToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
