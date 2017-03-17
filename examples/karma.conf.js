module.exports = function(karma) {
  var config = {
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

    browsers: [
      'PhantomJS'
    ],
    colors: true,
    concurrency: 1,
    exclude: [],
    files: [
      'bench/**/*.bench.js'
    ],
    frameworks: [
      'benchmark'
    ],
    junitReporter: {
      outputDir: 'reports',
      outputFile: 'benchmark.xml'
    },
    logLevel: karma.LOG_INFO,
    port: 9876,
    preprocessors: {},
    reporters: [
      'benchmark',
      'junit'
    ],
    singleRun: true
  };

  if (process.env.PLOTLY_API_KEY && process.env.PLOTLY_USERNAME) {
    config.reporters.push('plotly');
    config.plotlyReporter = {
      apiKey: process.env.PLOTLY_API_KEY,
      formatJson: true,
      pathToJson: 'reports/plotly.json',
      username: process.env.PLOTLY_USERNAME
    };
  }

  karma.set(config);
};
