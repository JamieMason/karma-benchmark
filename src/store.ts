import { KarmaBenchmark } from './benchmark';
import { KarmaSuite } from './suite';

const benchmarks: KarmaBenchmark[] = [];
const suites: KarmaSuite[] = [];

export const addBenchmark = (benchmark: KarmaBenchmark, hasSuite: boolean) => {
  benchmark.hasSuite = Boolean(hasSuite);
  benchmarks.push(benchmark);
  return benchmark;
};

export const addSuite = (suite: KarmaSuite) => {
  suites.push(suite);
  return suite;
};

export const getSuites = () => suites;
