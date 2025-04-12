import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import Route from './app/navigation/Route';
import store from './app/redux/store';
import 'react-native-url-polyfill/auto';

export default class App extends Component {
  //herOraXro@1.expo
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            //paddingTop: Platform.OS === 'android' ? 25 : 0,
            //backgroundColor:COLORS.primary ,
          }}
          edges={['top', 'left', 'right']}>
          <Provider store={store}>
            <Route />
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
