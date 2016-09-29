// 3rd party modules
var Benchmark = require('./vendor/Benchmark');

// modules
var construct = require('./lib/construct');
var store = require('./store');

// public
module.exports = WrappedBenchmark;
module.exports.Suite = WrappedSuite;

// implementation
var Suite = Benchmark.Suite;

function WrappedBenchmark(name, fn, options) {
  var oBenchmark = construct(Benchmark, name, fn, options);
  return store.addBenchmark(oBenchmark, false);
}

function WrappedSuite(name, options) {
  var oSuite = construct(Suite, name, options);
  oSuite.add = addBenchmark;
  store.addSuite(oSuite);
  return oSuite;
}

function addBenchmark(name, fn, options) {
  var oSuite = Suite.prototype.add.call(this, name, fn, options);
  var oBenchmark = oSuite[oSuite.length - 1];
  store.addBenchmark(oBenchmark, true);
  return oSuite;
}
