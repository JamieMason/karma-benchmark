const benchmarks = [];
const suites = [];

export const addBenchmark = (benchmark, hasSuite) => {
  benchmark.hasSuite = Boolean(hasSuite);
  benchmarks.push(benchmark);
  return benchmark;
};

export const addSuite = (suite) => {
  suites.push(suite);
  return suite;
};

export const getSuites = () => suites;
