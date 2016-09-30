// 3rd party modules
var Benchmark = require('benchmark');

// modules
var construct = require('./lib/construct');
var store = require('./store');

// public
WrappedBenchmark.Suite = WrappedSuite;
module.exports = WrappedBenchmark;

// implementation
var Suite = Benchmark.Suite;

function WrappedBenchmark(name, fn, options) {
  var benchmark = construct(Benchmark, name, fn, options);
  return store.addBenchmark(benchmark, false);
}

function WrappedSuite(name, options) {
  var suite = construct(Suite, name, options);
  suite.add = addBenchmark;
  store.addSuite(suite);
  return suite;
}

function addBenchmark(name, fn, options) {
  var suite = Suite.prototype.add.call(this, name, fn, options);
  var benchmark = suite[suite.length - 1];
  store.addBenchmark(benchmark, true);
  return suite;
}
