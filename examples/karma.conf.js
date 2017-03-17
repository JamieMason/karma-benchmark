module.exports = function(karma) {
  const config = {
    autoWatch: false,
    basePath: '',
    // for full list of options, see
    // https://github.com/FormidableLabs/karma-benchmarkjs-reporter
    benchmarkReporter: {
      decorator: '-',
      terminalWidth: 80,
      hzWidth: 4,
      hzUnits: 'ops/sec',
      browserWidth: 40,
      showBrowser: false,
      showSuiteSummary: true
    },
    browsers: ['Chrome'],
    colors: true,
    concurrency: 1,
    exclude: [],
    files: ['bench/**/*.bench.js'],
    frameworks: ['benchmark'],
    junitReporter: {
      outputDir: 'reports',
      outputFile: 'benchmark.xml'
    },
    logLevel: karma.LOG_INFO,
    port: 9876,
    preprocessors: {},
    reporters: ['benchmark', 'junit'],
    singleRun: true
  };

  // for full list of options, see
  // https://github.com/etpinard/karma-benchmark-plotly-reporter
  // for more examples, see
  // https://github.com/etpinard/karma-benchmark-plotly-reporter/tree/master/example
  if (process.env.PLOTLY_API_KEY && process.env.PLOTLY_USERNAME) {
    config.reporters.push('benchmark-plotly');
    config.benchmarkPlotlyReporter = {
      apiKey: process.env.PLOTLY_API_KEY,
      cloudFilename: 'karma-benchmark-plotly-example',
      imageFilename: 'karma-benchmark-plotly-example.png',
      username: process.env.PLOTLY_USERNAME
    };
  }

  karma.set(config);
};
