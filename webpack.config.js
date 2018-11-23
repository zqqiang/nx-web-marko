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
    contentBase: path.join(__dirname, "static"),
    publicPath: "/static/",
    compress: true,
    stats: "errors-only",
    host: process.env.HOST,
    port: process.env.PORT || 8090,
    after: function(app, server) {
      require("app-module-path").addPath(__dirname);
      require("marko/express");
      require("marko/node-require");
      require("marko/hot-reload").enable();
      const templatesDir = "src/components/app";
      require("fs").watch(templatesDir, function(event, filename) {
        if (/\.marko$/.test(filename)) {
          // Resolve the filename to a full template path:
          var templatePath = path.join(templatesDir, filename);

          console.log("Marko template modified: ", templatePath);

          // Pass along the *full* template path to marko
          require("marko/hot-reload").handleFileModified(templatePath);
        }
      });
      app.get("/", require("src/pages/home"));
    }
  }
};
