// modules
var registerApi = require('./api/register-api');
var runBenchmarks = require('./run-benchmarks');
var store = require('./store');
var wrapBenchmark = require('./wrap-benchmark');

// implementation
registerApi(global,
  wrapBenchmark(global, global.Benchmark)
);

global.__karma__.start = function (clientApi) {
  runBenchmarks(store.getSuites(), clientApi);
};
