const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'src')],
        exclude: [path.join(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ]
  },
  watch: true,
  entry: {
    background_scripts: "./src/background_scripts/background.js",
    popup: "./src/popup/destroy.js",
    content_scripts: "./src/content_scripts/destroy.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'umd',
    filename: function({ chunk: { entryModule: { resource } } }) {
      const filename = path.basename(resource)
      return `[name]/${filename}`
    }
  },
  node: false,
  plugins:[
    new CopyWebpackPlugin([
      {
        from: './src/css',
        to: 'css'
      },
      {
        from: './src/icons',
        to: 'icons'
      },
      {
        from: './src/**/*.css',
        to: '[1]',
        test: /src\/(.*\.css)/
      },
      {
        from: './src/**/*.html',
        to: '[1]',
        test: /src\/(.*\.html)/
      },
      './src/manifest.json'
    ])
  ]
};
