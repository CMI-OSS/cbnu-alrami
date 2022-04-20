/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
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
    extensions: [ ".tsx", ".ts", ".js" ],
    alias: {
      src: path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared/src"),
      "@components": path.resolve(__dirname, './src/components'),
      extensions: [ ".js", ".ts", ".tsx" ],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: "/node_modules/",
        use: [ "babel-loader", "ts-loader" ],
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]?[hash]",
            },
          },
        ],
      },
      {
        test: /\.(sc|c)ss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    ...(isAnalyze ? [ new BundleAnalyzerPlugin() ] : []),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
