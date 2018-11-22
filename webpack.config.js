"use strict";
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "#cheap-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".marko"],
    modules: ["./", "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.marko$/,
        loader: "marko-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("static", {}),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  devServer: {
    stats: "errors-only",
    host: process.env.HOST,
    port: process.env.PORT || 8090,
    open: true
  }
};
