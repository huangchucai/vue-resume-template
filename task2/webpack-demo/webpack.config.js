module.exports = {
  entry: './app.js',
  output: {
    filename:'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: ['node_modules'],
        use: {
          loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }
      }
    ]
  },
  resolve:{
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}
