const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackCommonConfig = require('./webpack.common.js');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }, 
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});
