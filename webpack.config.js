"use strict";
var webpack = require("webpack");

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
      }
    ]
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()]
};
