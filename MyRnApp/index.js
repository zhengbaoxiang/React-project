import { AppRegistry, Platform } from 'react-native'
import App from './src/App'
import RootSiblingParent from 'emrn-common/components/RootSiblingParent'

console.disableYellowBox = true
AppRegistry.registerComponent('EMApp', function () {
  return RootSiblingParent(App)
})
