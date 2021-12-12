/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devServer: {
    port: 8080,
    historyApiFallback: true,
    compress: true,
    open: true,
  },
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, "./build"),
  },
  devtool: "eval-cheap-source-map",
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
    alias: {
      src: path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared/src"),
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
        test: /\.css$/,
        exclude: "/node_modules/",
        use: [ "style-loader", "css-loader" ],
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimizer: 
     [ new OptimizeCSSAssetsPlugin() ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()
  ],
};
