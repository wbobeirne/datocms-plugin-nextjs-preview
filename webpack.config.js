const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: __dirname + "/src/index.jsx",
  mode: process.env.NODE_ENV,
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./",
    disableHostCheck: true,
    public: "https://datocms-plugin-nextjs-preview.localtunnel.me",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "DatoCMS plugin",
      minify: isProduction,
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      append: false,
      publicPath: "",
      assets: [
        "https://unpkg.com/datocms-plugins-sdk@0.0.9/dist/sdk.js",
        "https://unpkg.com/datocms-plugins-sdk@0.0.9/dist/sdk.css",
      ],
    }),
  ].filter(Boolean),
};
