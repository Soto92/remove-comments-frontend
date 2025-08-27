const path = require("path");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./extension.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  externals: ["vscode"],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(@babel|postcss|postcss-safe-parser)\/)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
};
