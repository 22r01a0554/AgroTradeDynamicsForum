const { override, addWebpackAlias, addWebpackResolve, addWebpackPlugin, addBabelPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackAlias({
    'crypto': require.resolve('crypto-browserify'),
    'stream': require.resolve('stream-browserify'),
    'vm': require.resolve('vm-browserify')
  }),
  addWebpackResolve({
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url/"),
      "process": require.resolve("process/browser"),
      "vm": require.resolve("vm-browserify")
    }
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ),
  addBabelPlugin([
    '@babel/plugin-proposal-decorators', { legacy: true }
  ])
);
