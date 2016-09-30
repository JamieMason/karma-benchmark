// modules
var processBenchmarks = require('./process-benchmarks');
var provideApi = require('./provide-api');
var provideDump = require('./provide-dump');
var runBenchmarks = require('./run-benchmarks');
var store = require('./store');
var WrappedBenchmark = require('./wrapped-benchmark');

// implementation
global.Benchmark = WrappedBenchmark;
provideApi(global);
provideDump(global);

global.__karma__.start = function () {
  runBenchmarks(global,
    processBenchmarks(store.getSuites())
  );
};
