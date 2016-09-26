module.exports = {
  'framework:benchmark': ['factory', initBenchmark]
};

function initBenchmark(files) {
  ['lodash', 'platform', 'benchmark', './dist/karma-benchmark.js']
    .reverse().forEach(registerFile);

  function registerFile(selector) {
    files.unshift({
      included: true,
      pattern: require.resolve(selector),
      served: true,
      watched: false
    });
  }
}

initBenchmark.$inject = ['config.files'];
