/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'websocket-polyfill'
import "./shim"
require('react-native-ui-lib/config').setConfig({appScheme: 'dark'});

AppRegistry.registerComponent(appName, () => App);
