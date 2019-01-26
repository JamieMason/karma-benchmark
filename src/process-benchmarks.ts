import { some } from 'lodash';

export const processBenchmarks = (suites) => {
  const isFocused = ({ runAlone }) => runAlone === true;
  const isFocusedSuite = (suite) => isFocused(suite) || some(suite, isFocused);
  const focusedSuites = suites.filter(isFocusedSuite);

  const focusBenchmarks = (suite) => {
    const focusedBenchmarks = suite.filter(isFocused);
    const removed = suite.length - focusedBenchmarks.length;
    const name = `${suite.name} (${removed} benchmarks have been ignored)`;
    focusedBenchmarks.name = name;
    return focusedBenchmarks.length ? focusedBenchmarks : suite;
  };

  return focusedSuites.length > 0 ? focusedSuites.map(focusBenchmarks) : suites;
};
