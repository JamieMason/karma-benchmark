const path = require('path');

module.exports = {
  devtool: false,
  entry: {
    'karma-benchmark': './src/karma-benchmark.ts'
  },
  externals: {
    benchmark: 'Benchmark',
    lodash: '_'
  },
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts']
  }
};
