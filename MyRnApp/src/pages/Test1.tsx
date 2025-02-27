import React, { Component } from 'react'
import { Text, View, Button, Image, EmNavigation } from 'em-react-native'
import { NavigationScreenProp } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<{}>
}
export default class Test1 extends Component<Props> {
  static navigationOptions = {
    title: '测试页面一',
  }
  render() {
    const { navigation } = this.props
    return (
      <View>
        <Text>测试页面一</Text>
        <Text>测试页面一</Text>
        <Text>测试页面一</Text>
        <Text>显示一张图片</Text>
        <Image
          source={require('../images/test.png')}
          style={{ width: 100, height: 100 }}
        />
        <Button
          title="返回首页"
          onPress={() => {
            EmNavigation.goBack(navigation)
          }}
        />
      </View>
    )
  }
}
