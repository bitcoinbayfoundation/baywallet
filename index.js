/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'websocket-polyfill'
import "./shim"

AppRegistry.registerComponent(appName, () => App);
