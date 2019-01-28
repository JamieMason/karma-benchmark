import { KarmaBenchmark } from './benchmark';
import { filterBenchmarks } from './filter-benchmarks';
import * as store from './store';
import { KarmaSuite } from './suite';

export const provideRunner = (obj: NodeJS.Global) => {
  obj.__karma__.start = async () => {
    const { __coverage__, __karma__ } = obj;
    const suites = filterBenchmarks(store.getSuites());

    const runSuite = (suite: KarmaSuite) =>
      new Promise((resolve) => {
        let errors = [];
        suite
          .on('cycle', ({ target: benchmark }: { target: KarmaBenchmark }) => {
            errors = [];
            __karma__.result({
              benchmark: {
                count: benchmark.count,
                cycles: benchmark.cycles,
                error: benchmark.error,
                hz: benchmark.hz,
                name: benchmark.name,
                stats: benchmark.stats,
                suite: suite.name
              },
              description: `${suite.name}: ${benchmark.name}`,
              id: benchmark.id,
              log: errors,
              skipped: false,
              success: errors.length === 0,
              suite: [],
              time: benchmark.stats.mean * 1000
            });
          })
          .on('abort error', ({ target }: { target: KarmaBenchmark | any }) => {
            errors.push(target.error.toString());
          })
          .on('complete', () => {
            resolve();
          })
          .run({ async: true });
      });

    for (const suite of suites) {
      await runSuite(suite);
    }

    __karma__.complete({
      coverage: __coverage__
    });
  };
};
