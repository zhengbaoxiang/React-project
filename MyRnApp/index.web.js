import 'babel-polyfill'
import 'core-js/fn/map'
import 'core-js/fn/set'
import 'core-js/fn/object/assign'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, function () {
  return App
})
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
})
