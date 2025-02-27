import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, Platform } from 'react-native'
import { EmNavigation, _Version_, injectProps } from 'em-react-native'
import { NavigationScreenProp } from 'react-navigation'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'Press ctrl + f5 to force reload. \n',
})
const runInfo =
  Platform.OS === 'web'
    ? 'To run on device, run command: npm run start'
    : 'To run on browser, run command: npm run build && npm run h5'

interface Props {
  navigation: NavigationScreenProp<{}>
}
export default class Home extends Component<Props> {
  static navigationOptions = {
    title: '首页',
  }
  constructor(props: Props) {
    super(props)
    injectProps(props)
    this.state = {}
  }
  componentDidMount() {}

  render() {
    const { navigation } = this.props
    return (
      <View>
        <View style={pageStyle.content}>
          <Text style={pageStyle.contentText}>
            Welcome to Eastmoney React Native!
          </Text>
          <Text style={pageStyle.contentText}>
            em-react-native：{_Version_}
          </Text>
          <Text style={pageStyle.contentText}>
            To get started, edit src/App.tsx
          </Text>
          <Text style={pageStyle.contentText}>{instructions}</Text>
          <Text style={pageStyle.contentText}>{runInfo}</Text>
        </View>
        <Button
          title="测试页面一（组件跳转）"
          onPress={() => {
            EmNavigation.navigate('Test1', null, navigation)
          }}
        />
        <Button
          title="测试页面二（图表示例）"
          onPress={() => {
            EmNavigation.navigate('Test2', null, navigation)
          }}
        />
        <Button
          title="带参数测试页（组件跳转参数）"
          onPress={() => {
            EmNavigation.navigate('Test3', { name: '张三' }, navigation)
          }}
        />
        <Button
          title="自定义跳转参数"
          onPress={() => {
            EmNavigation.navigate('Test3', { name: '李四' }, navigation)
          }}
        />
        <Button
          title="与App交互"
          onPress={() => {
            EmNavigation.navigate('Test4', null, navigation)
          }}
        />
      </View>
    )
  }
}

const pageStyle = StyleSheet.create({
  content: {
    height: 200,
    justifyContent: 'center',
  },
  contentText: {
    textAlign: 'center',
    margin: 2,
    color: 'green',
  },
})
