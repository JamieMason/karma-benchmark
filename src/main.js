// modules
var registerApi = require('./register-api');
var processBenchmarks = require('./process-benchmarks');
var runBenchmarks = require('./run-benchmarks');
var store = require('./store');
var wrapBenchmark = require('./wrap-benchmark');

// implementation
registerApi(global,
  wrapBenchmark(global, global.Benchmark)
);

global.__karma__.start = function () {
  var clientApi = this;
  var suites = processBenchmarks(store.getSuites());
  runBenchmarks(suites, clientApi);
};
