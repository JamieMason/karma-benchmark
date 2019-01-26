export const provideApi = (obj) => {
  const addSuite = (name, addBenchmarks, options, runAlone) => {
    const suite = new obj.Benchmark.Suite(name, options);
    suite.runAlone = Boolean(runAlone);
    updateBenchmarkApi(obj, suite);
    addBenchmarks();
  };

  const focusSuite = (name, addBenchmarks, options) => {
    addSuite(name, addBenchmarks, options, true);
  };

  const skipSuite = () => {
    /* noop */
  };

  obj.suite = addSuite;
  obj.suite.only = obj.ssuite = focusSuite;
  obj.suite.skip = obj.xsuite = skipSuite;
};

const updateBenchmarkApi = (obj, suite) => {
  const addBenchmark = (name, fn, options, runAlone) => {
    suite.add(name, fn, options);
    const benchmark = suite[suite.length - 1];
    benchmark.runAlone = Boolean(runAlone);
  };

  const focusBenchmark = (name, addBenchmarks, options) => {
    addBenchmark(name, addBenchmarks, options, true);
  };

  const skipBenchmark = () => {
    /* noop */
  };

  obj.benchmark = addBenchmark;
  obj.benchmark.only = obj.bbenchmark = focusBenchmark;
  obj.benchmark.skip = obj.xbenchmark = skipBenchmark;
};
