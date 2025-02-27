import React, { Component } from 'react'
import { Text, Button, ScrollView, EmNavigation } from 'em-react-native'
import Hybrid from 'emrn-common/utils/hybrid'
import { NavigationScreenProp } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<{}>
}
interface State {
  passport: any
}

export default class Test4 extends Component<Props, State> {
  static navigationOptions = {
    title: '与App交互',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      passport: null,
    }
  }

  async componentDidMount() {
    try {
      const passport = await Hybrid.Passport.getUserInfo()
      this.setState({
        passport,
      })
    } catch (e) {
      alert(e)
    }
  }

  render() {
    const { navigation } = this.props
    const { passport } = this.state
    return (
      <ScrollView>
        <Text>通行证信息: {JSON.stringify(passport)}</Text>
        <Button
          title="返回首页"
          onPress={() => {
            EmNavigation.goBack(navigation)
          }}
        />
      </ScrollView>
    )
  }
}
