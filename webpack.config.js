"use strict";
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "#cheap-source-map",
  entry: "./src/client.js",
  output: {
    path: __dirname,
    filename: "static/bundle.js"
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
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/style.[contenthash].css"
    })
  ]
};
