initBenchmark.$inject = ['config.files'];

module.exports = {
  'framework:benchmark': ['factory', initBenchmark]
};

function initBenchmark(files) {
  ['./src/perftacular.js', './src/adapter.js', 'benchmark']
    .forEach(registerFile);

  function registerFile(selector) {
    files.unshift({
      included: true,
      pattern: require.resolve(selector),
      served: true,
      watched: false
    });
  }
}
