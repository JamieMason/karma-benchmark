// public
module.exports = provideApi;

// implementation
function provideApi(obj) {
  obj.suite = addSuite;
  obj.suite.only = obj.ssuite = focusSuite;
  obj.suite.skip = obj.xsuite = skipSuite;

  function addSuite(name, addBenchmarks, options, runAlone) {
    var suite = new obj.Benchmark.Suite(name, options);
    suite.runAlone = Boolean(runAlone);
    updateBenchmarkApi(obj, suite);
    addBenchmarks();
  }

  function focusSuite(name, addBenchmarks, options) {
    addSuite(name, addBenchmarks, options, true);
  }

  function skipSuite() {}
}

function updateBenchmarkApi(obj, suite) {
  obj.benchmark = addBenchmark;
  obj.benchmark.only = obj.bbenchmark = focusBenchmark;
  obj.benchmark.skip = obj.xbenchmark = skipBenchmark;

  function addBenchmark(name, fn, options, runAlone) {
    suite.add(name, fn, options);
    var benchmark = suite[suite.length - 1];
    benchmark.runAlone = Boolean(runAlone);
  }

  function focusBenchmark(name, addBenchmarks, options) {
    addBenchmark(name, addBenchmarks, options, true);
  }

  function skipBenchmark() {}
}
