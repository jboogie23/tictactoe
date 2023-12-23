module.exports = {
  mode: "production",
  entry: "./game.js",
  output: {
    filename: "main.js",
    publicPath: "dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
