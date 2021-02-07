const path = require("path");

module.exports = {
  entry: "./background/index.ts",
  output: {
    filename: "bundle.bg.js",
    path: path.resolve(__dirname, "dist", "scripts"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.bg.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
