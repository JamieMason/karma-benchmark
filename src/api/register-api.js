// 3rd party modules
var Benchmark = require('./vendor/benchmark');

// public
module.exports = registerApi;

// implementation
function registerApi() {
  global.suite = addSuite;
  global.ssuite = addSuite.only = focusSuite;
  global.xsuite = addSuite.skip = skipSuite;
}

function addSuite(name, addBenchmarks, options, runAlone) {
  var oSuite = new Benchmark.Suite(name, options);
  oSuite.runAlone = Boolean(runAlone);
  updateBenchmarkApi(oSuite);
  addBenchmarks();
}

function focusSuite(name, addBenchmarks, options) {
  addSuite(name, addBenchmarks, options, true);
}

function skipSuite() {}

function updateBenchmarkApi(oSuite) {
  global.benchmark = addBenchmark;
  global.bbenchmark = addBenchmark.only = focusBenchmark;
  global.xbenchmark = addBenchmark.skip = skipBenchmark;

  return addBenchmark;

  function addBenchmark(name, fn, options, runAlone) {
    oSuite.add(name, fn, options);
    var oBenchmark = oSuite[oSuite.length - 1];
    oBenchmark.runAlone = Boolean(runAlone);
  }

  function focusBenchmark(name, addBenchmarks, options) {
    addBenchmark(name, addBenchmarks, options, true);
  }

  function skipBenchmark() {}
}
