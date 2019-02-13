/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux'
import store from './App/store'
import Home from './App/Home'


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
            <Home/>
        </Provider>
    );
  }
}


