const initBenchmark = (files) => {
  ['lodash', 'platform', 'benchmark', './karma-benchmark.js']
    .reverse()
    .forEach((selector) => {
      files.unshift({
        included: true,
        pattern: require.resolve(selector),
        served: true,
        watched: false
      });
    });
};

module.exports = {
  'framework:benchmark': ['factory', initBenchmark]
};

initBenchmark.$inject = ['config.files'];
