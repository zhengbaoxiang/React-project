import React, { Component } from 'react'
import { Easing, Animated, YellowBox, StatusBar, Platform } from 'react-native'
import { EmNavigation } from 'em-react-native'

import isIPad from 'emrn-common/utils/isIPad'
import rpx from 'emrn-common/utils/rpx'
import HeaderLeft from 'emrn-common/components/EmTitleLeft'
import HeaderRight from 'emrn-common/components/EmTitleRight'
import NavigationService from 'emrn-common/navigation/NavigationService'
import 'emrn-common/settings/Text'

import { basePath } from '../app.json'
import routes from './routes'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule',
  'VirtualizedList',
  'Warning: Each',
  'Remote debugger',
])

interface Props {
  theme: string
  page?: string
}

//定义配置项
const navigationConfig = { basePath }
//调配置接口初始化
EmNavigation.config(navigationConfig)
export default class App extends Component {
  MainStack: any
  constructor(props: Props) {
    super(props)
    const theme = props.theme
    StatusBar.setTranslucent(false)
    this.MainStack = EmNavigation.createEmNavigator(routes, {
      initialRouteName:
        Platform.OS === 'web'
          ? navigationConfig.basePath
          : resolveDefaultPage(props.page), //可以通过启动参数设置默认首页
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: theme == 'w' ? '#ea5504' : '#1c1c1c',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          height: isIPad
            ? 30
            : Platform.OS === 'android'
            ? (StatusBar.currentHeight || 0) + 44
            : 44,
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          height: rpx(46),
          lineHeight: rpx(46),
          fontSize: rpx(32),
          fontWeight: 'bold',
          color: '#fff',
          flex: 1,
          fontFamily: 'PingFang SC',
          textAlign: 'center',
          transform: [{ translateY: isIPad ? -10 : 0 }],
        },
        headerTitleAllowFontScaling: true,
        headerLeft: <HeaderLeft theme={theme} />,
        headerRight: <HeaderRight theme={theme} />,
        headerTitleContainerStyle: {
          flex: 1,
        },
        headerLeftContainerStyle: {},
        headerRightContainerStyle: {},
      },
      transitionConfig,
    })
  }

  componentDidMount(): void {
    StatusBar.setTranslucent(false)
  }

  componentWillUnmount() {
    NavigationService.removeTopLevelNavigator()
  }

  render() {
    const { MainStack } = this
    return (
      <MainStack
        ref={(navigatorRef: any) => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    )
  }
}

//解析props.page，非法page重定向到首页
function resolveDefaultPage(page?: string, defaultPage = 'home') {
  try {
    if (page) {
      if (Object.keys(routes).indexOf(page) !== -1) {
        return page
      }
    }
  } catch (e) {}
  return defaultPage
}

const transitionConfig = () => ({
  transitionSpec: {
    duration: 350,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: (sceneProps: any) => {
    const { layout, position, scene } = sceneProps
    const { index } = scene
    const width = layout.initWidth
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0],
    })
    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    })
    return { opacity, transform: [{ translateX }] }
  },
})
