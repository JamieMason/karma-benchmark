import Benchmark = require('benchmark');
import * as store from './store';

const Suite = Benchmark.Suite;

const construct = (Instance, a?, b?, c?) => {
  if (c) {
    return new Instance(a, b, c);
  }
  if (b) {
    return new Instance(a, b);
  }
  if (a) {
    return new Instance(a);
  }
  return new Instance();
};

export const WrappedBenchmark = (
  name: string,
  fn: string | Function,
  options?: Benchmark.Options
): Benchmark => {
  const benchmark = construct(Benchmark, name, fn, options);
  return store.addBenchmark(benchmark, false);
};

const WrappedSuite = (
  name?: string,
  options?: Benchmark.Options
): Benchmark.Suite => {
  const suite = construct(Suite, name, options);
  suite.add = addBenchmark;
  store.addSuite(suite);
  return suite;
};

function addBenchmark(
  name: string,
  fn: string | Function,
  options?: Benchmark.Options
): Benchmark.Suite {
  const suite = Suite.prototype.add.call(this, name, fn, options);
  const benchmark = suite[suite.length - 1];
  store.addBenchmark(benchmark, true);
  return suite;
}

WrappedBenchmark.Suite = WrappedSuite;
