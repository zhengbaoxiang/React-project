/**
 * webpack config
 */
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const appDirectory = path.resolve(__dirname)
let env = process.env.NODE_ENV || 'development'

console.log('=======================================')
console.log(`= webpack mode: ${env}`)
console.log('=======================================')

module.exports = {
  mode: process.env.NODE_ENV,
  context: __dirname,
  entry: ['./index.web'],
  output: {
    path: path.resolve(
      appDirectory,
      'h5',
      env === 'production' ? 'release' : 'dev'
    ),
    publicPath: env === 'development' ? '/static/' : '',
    chunkFilename: '[name].bundle.js?v=[contenthash:8]',
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /tpl\.html|postMock\.html/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'node_modules'),
        ],
        exclude: [
          path.resolve(appDirectory, 'node_modules/babel-runtime'),
          path.resolve(appDirectory, 'node_modules/core-js'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: ['react-native'],
            plugins: [
              // needed to support async/await
              'transform-runtime',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'h5', 'template.html'),
      filename: 'index.html',
      vConsoleScript:
        env === 'development'
          ? '<script src="https://emfed.eastmoney.com/public/resource/js/vconsole.min.js"></script>'
          : '',
    }),
    new webpack.DefinePlugin({
      __DEV__: env === 'development',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        // for: 项目公共组件
        // common: {
        // },
        //第三方组件
        lib: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'lib',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  devtool: 'cheap-source-map',
  resolve: {
    alias: Object.assign(
      {
        // use commonjs modules due to mock haste resolver aliases
        'react-native$': 'react-native-web/dist/cjs',
      },
      {
        // adapt for web
        'react-navigation': path.resolve(
          __dirname,
          './node_modules/@react-navigation/core'
        ),
        './Echarts/index$': './Echarts/index.web',
        './assets$': './assets.web',
      },
      {
        //示例项目图片
        './flux.png': './flux@3x.png',
        '../relay.png': '../relay@3x.png',
        './uie_comment_highlighted.png': './uie_comment_highlighted@2x.png',
        './uie_comment_normal.png': './uie_comment_normal@2x.png',
        './uie_thumb_normal.png': './uie_thumb_normal@2x.png',
        './uie_thumb_selected.png': './uie_thumb_selected@2x.png',
        '../images/back-w.png': '../images/back-w@2x.png',
        '../images/back.png': '../images/back@2x.png',
        //这里添加项目图片的解析
      },

      // mock haste resolver
      [
        'ActivityIndicator',
        'Alert',
        'AsyncStorage',
        'Button',
        'DeviceInfo',
        'Modal',
        'NativeModules',
        'Platform',
        'SafeAreaView',
        'SectionList',
        'StyleSheet',
        'Switch',
        'Text',
        'TextInput',
        'TouchableHighlight',
        'TouchableWithoutFeedback',
        'View',
        'ViewPropTypes',
      ].reduce(
        (acc, curr) => {
          acc[curr] = `react-native-web/dist/cjs/exports/${curr}`
          return acc
        },
        {
          JSEventLoopWatchdog:
            'react-native-web/dist/cjs/vendor/react-native/JSEventLoopWatchdog',
          React$: 'react',
          ReactNative$: 'react-native-web/dist/cjs',
          infoLog$: 'react-native-web/dist/cjs/vendor/react-native/infoLog',
        }
      )
    ),
    extensions: [
      '.web.js',
      '.js',
      '.json',
      '.web.tsx',
      '.tsx',
      '.web.ts',
      '.ts',
    ],
  },
}
