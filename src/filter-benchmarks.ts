import { some } from 'lodash';
import { KarmaBenchmark } from './benchmark';
import { KarmaSuite } from './suite';

const isFocused = ({ runAlone }: KarmaSuite | KarmaBenchmark) => runAlone;

export const filterBenchmarks = (suites: KarmaSuite[]) =>
  suites
    .filter((suite) => isFocused(suite) || some(suite, isFocused))
    .map<KarmaSuite>((suite) => {
      const focusedBenchmarks = suite.filter(isFocused);
      const removed = suite.length - focusedBenchmarks.length;
      const name = `${suite.name} (${removed} benchmarks have been ignored)`;
      focusedBenchmarks.name = name;
      return focusedBenchmarks.length ? focusedBenchmarks : suite;
    });
