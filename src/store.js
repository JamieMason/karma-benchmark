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
  console.log('benchmark added:', benchmark, benchmarks);
  return benchmark;
}

function addSuite(suite) {
  suites.push(suite);
  console.log('suite added:', suite, suites);
  return suite;
}

function getSuites() {
  return suites;
}
