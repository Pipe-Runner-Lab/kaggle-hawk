const path = require("path");
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = {
  entry: "./background/index.ts",
  output: {
    filename: "background.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts"],
  },
};
