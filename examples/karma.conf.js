module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    exclude: [],
    files: ['bench/**/*.bench.js'],
    frameworks: ['benchmark'],
    junitReporter: {
      outputDir: 'reports',
      outputFile: 'benchmark.xml'
    },
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {},
    reporters: ['benchmark', 'junit'],
    singleRun: true
  });
};
