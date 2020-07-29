import * as React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';
import { StatusBar, Platform } from 'react-native';
import { Router } from 'react-native-router-flux';
import Sentry from 'sentry-expo';

import getTheme from '@assets/native-base-theme/components';
import theme from '@assets/native-base-theme/variables/commonColor';

import configureStore from '@app/store';
import Loading from '@components/loading/Loading';
import Routes from './src/routes/routes';

const { persistor, store } = configureStore();

if (Platform.OS === 'android') StatusBar.setHidden(true);

Sentry.enableInExpoDevelopment = true;
Sentry.config(
  'https://3291e65696be471a80301ee041d6fc59@sentry.io/1764003'
).install();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Questrial: require('@assets/fonts/Questrial.ttf'),
      Bree: require('@assets/fonts/Bree.ttf'),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <StyleProvider style={getTheme(theme)}>
            <Router>{Routes}</Router>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
