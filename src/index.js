import React from 'react';
import Expo from 'expo';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';

import getTheme from '../native-base-theme/components';
import theme from '../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/Loading';
import LoginScreen from './containers/LoginApp';

if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
    isAuthenticated: PropTypes.bool,
  };

  static defaultProps = {
    isAuthenticated: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    this.setState({ isReady: true });
  }

  render() {
    const { isAuthenticated } = this.props;

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    return (
      <Provider store={this.props.store}>
        <PersistGate
          loading={<Loading />}
          persistor={this.props.persistor}
        >
          <StyleProvider style={getTheme(theme)}>
            <Router>
              <Stack key="root">
                {Routes}
              </Stack>
            </Router>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
