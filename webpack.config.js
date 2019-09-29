const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require("config");
var libraryName = "DataGrid";

/*-------------------------------------------------*/

module.exports = {
  // webpack optimization mode
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",

  devtool: "source-map",

  // entry file(s)
  entry: "./src/DataGrid.js",

  // output file(s) and chunks
  output: {
    library: libraryName,
    libraryTarget: "umd",
    libraryExport: "default",
    path: path.resolve(__dirname, "dist"),
    filename: libraryName + ".js",
    publicPath: config.get("publicPath"),
    umdNamedDefine: true
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    }),
    new ExtractTextPlugin({ filename: "DataGrid.css" })
  ],

  // development server configuration
  devServer: {
    // must be `true` for SPAs
    historyApiFallback: true,

    // open browser on server start
    open: config.get("open")
  },

  // generate source map
  devtool: "source-map"
};
