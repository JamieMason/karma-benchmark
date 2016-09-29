// modules
var construct = require('./lib/construct');
var store = require('./store');

// public
module.exports = wrapBenchmark;

// implementation
function wrapBenchmark(obj, Benchmark) {
  var Suite = Benchmark.Suite;
  obj.Benchmark = WrappedBenchmark;
  obj.Benchmark.Suite = WrappedSuite;
  return obj.Benchmark;

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
}
