const path = require("path");
const webpack = require('webpack')
const config = require('./server.config')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "../build"),
    filename: "[name].bundle.js"
  },
  mode: "development",
  watchOptions: {
    ignored: ["node_modules/**"],
  },
  devtool: "inline-cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../build"),
    compress: true,
    host: config.web.host,
    port: config.web.port,
    overlay: true,
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader" // transpiring our JavaScript files using Babel and webpack
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader", // Loader for webpack to process CSS with PostCSS
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader", // This will resolves import/require() on a file into a url and emits the file into the output directory.
            options: {
              name: "[name].[ext]",
              outputPath: "assets/"
            }
          },
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attributes: true,
            minimize: true
          }
        }
      }
    ]
  },
  plugins: [
    // CleanWebpackPlugin will do some clean up/remove folder before build
    // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
    new CleanWebpackPlugin(),
    // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development'),
      "process.env.API_PORT": JSON.stringify(process.env.API_PORT || 5005),
      "process.env.UI_PORT": JSON.stringify(process.env.UI_PORT || 3000),
      "process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL || 'http://localhost:5005'),
      "process.env.API_ORIGIN": JSON.stringify(process.env.API_ORIGIN || 'http://localhost:3000'),
    })
  ]
};
