/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isAnalyze = process.argv.includes("--analyze");
const prod = process.env.NODE_ENV || "production";

module.exports = {
  devServer: {
    port: 3000,
    historyApiFallback: true,
    compress: true,
    open: true,
  },
  entry: {
    main: "./src/index",
  },
  output: {
    filename: "[name].[chunkhash:8].bundle.js",
    chunkFilename: "[name].[chunkhash:8].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devtool: prod ? "cheap-source-map" : "eval-cheap-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared/src"),
      extensions: [".js", ".ts", ".tsx"],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: "/node_modules/",
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.jfif$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
