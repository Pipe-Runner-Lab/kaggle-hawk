const path = require("path");

module.exports = {
  entry: "./background/index.js",
  output: {
    filename: "bundle.bg.js",
    path: path.resolve(__dirname, "dist", "scripts"),
  },
};
