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
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: file => {
                //TODO: get scss directory to write to dist/css, but have
                // all other scss files output wherever they stand in the tree
                //console.log(file)
                return 'css/[name].css'
              },
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'sass-loader'
          }
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
    styles: './src/scss/styles.scss',
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
        from: './src/icons',
        to: 'icons'
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
