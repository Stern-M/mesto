const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/pages/index.js'
},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
},
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
      test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
         {loader: 'css-loader',
         options: { importLoaders: 1 }
          },
          'postcss-loader'
       ]
      },
      {

        test: /\.js$/,
        
        use: 'babel-loader',
        
        exclude: '/node_modules/'
        
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/, type: 'asset/resource', generator: {
            filename: 'images/[name].[contenthash][ext]',
          }
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', generator: {
            filename: 'vendor/[name].[contenthash][ext]',
          }
        }]
  }
}