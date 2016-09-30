// modules
var processBenchmarks = require('./process-benchmarks');
var registerApi = require('./register-api');
var registerDump = require('./register-dump');
var runBenchmarks = require('./run-benchmarks');
var store = require('./store');
var wrapBenchmark = require('./wrap-benchmark');

// implementation
var clientApi = global.__karma__;
var wrappedBenchmark = wrapBenchmark(global, global.Benchmark);

// create window.dump
registerDump(global, clientApi);

// expose our wrapper as window.Benchmark
registerApi(global, wrappedBenchmark);

clientApi.start = function () {
  var focusedSuites = processBenchmarks(store.getSuites());
  runBenchmarks(global, focusedSuites, clientApi);
};
