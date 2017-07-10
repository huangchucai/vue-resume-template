module.exports = {
  entry: './app.js',
  output: {
    filename:'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        use:['url-loader']
      },
      {
        test: /.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }
    ]
  },
  resolve:{
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}
