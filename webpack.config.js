const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: path.resolve(srcPath, 'app.jsx'),
  output: {
    filename: 'bundle.js',
    path: distPath,
  },
  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['env', 'react']
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: `${srcPath}/*.+(html|css|js)`,
      to: distPath,
      flatten: true
    }], {/* options */})
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      app: srcPath,
    }
  }
};
