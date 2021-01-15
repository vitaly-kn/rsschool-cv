const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./script.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      favicon: "./favicon.png",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/sound/"),
          to: path.resolve(__dirname, "dist/assets/sound/"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/img",
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts",
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/sound",
            },
          },
        ],
      },
    ],
  },
};
