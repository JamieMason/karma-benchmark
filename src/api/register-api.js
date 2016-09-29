// public
module.exports = registerApi;

// implementation
function registerApi(obj, Benchmark) {
  obj.suite = addSuite;
  obj.suite.only = obj.ssuite = focusSuite;
  obj.suite.skip = obj.xsuite = skipSuite;

  function addSuite(name, addBenchmarks, options, runAlone) {
    var oSuite = new Benchmark.Suite(name, options);
    oSuite.runAlone = Boolean(runAlone);
    updateBenchmarkApi(obj, oSuite);
    addBenchmarks();
  }

  function focusSuite(name, addBenchmarks, options) {
    addSuite(name, addBenchmarks, options, true);
  }

  function skipSuite() {}
}

function updateBenchmarkApi(obj, oSuite) {
  obj.benchmark = addBenchmark;
  obj.benchmark.only = obj.bbenchmark = focusBenchmark;
  obj.benchmark.skip = obj.xbenchmark = skipBenchmark;

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
