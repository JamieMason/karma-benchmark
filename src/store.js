// public
module.exports = {
  addBenchmark: addBenchmark,
  addSuite: addSuite,
  getSuites: getSuites
};

// implementation
var benchmarks = [];
var suites = [];

function addBenchmark(benchmark, hasSuite) {
  benchmark.hasSuite = Boolean(hasSuite);
  benchmarks.push(benchmark);
  return benchmark;
}

function addSuite(suite) {
  suites.push(suite);
  return suite;
}

function getSuites() {
  return suites;
}
