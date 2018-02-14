import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';

import getTheme from './native-base-theme/components';
import theme from './native-base-theme/variables/commonColor';

import configureStore from './src/store/index';
import Loading from './src/components/Loading';
import LoginScreen from './src/containers/LoginApp';

const { persistor, store } = configureStore();

export default class App extends React.Component {
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
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
        >
          <StyleProvider style={getTheme(theme)}>
            <LoginScreen />
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
