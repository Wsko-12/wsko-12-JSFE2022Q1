const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./src/style/mixins.scss']
              },
            },
          ],
        },
        {
          test: /\.svg/,
          type: 'asset'
        },
      ],
    },
    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, '../dist'),
      clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
      template: './src/index.html'
    })],
  };