// 3rd party modules
var karma = require('./vendor/karma');

// modules
var runBenchmarks = require('./run-benchmarks');
var WrappedBenchmark = require('./wrapped-benchmark');

// implementation
global.Benchmark = WrappedBenchmark;

karma.start = function () {
  runBenchmarks(function () {
    karma.complete({
      coverage: global.__coverage__
    });
  });
};
