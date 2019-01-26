export const runBenchmarks = (
  { __karma__, __coverage__ }: NodeJS.Global,
  suites
) => {
  const runNextBenchmark = () => {
    if (suites.length > 0) {
      runSuite(suites.shift());
    } else {
      onComplete();
    }
  };

  const onComplete = () => {
    __karma__.complete({
      coverage: __coverage__
    });
  };

  const runSuite = (suite) => {
    let errors = [];
    suite
      .on('cycle', ({ target }) => {
        __karma__.result({
          benchmark: {
            count: target.count,
            cycles: target.cycles,
            error: target.error,
            hz: target.hz,
            name: target.name,
            stats: target.stats,
            suite: suite.name
          },
          description: `${suite.name}: ${target.name}`,
          id: target.id,
          log: errors,
          skipped: false,
          success: errors.length === 0,
          suite: [],
          time: target.stats.mean * 1000
        });
        errors = [];
      })
      .on('abort error', ({ target }) => {
        errors.push(target.error.toString());
      })
      .on('complete', runNextBenchmark)
      .run({ async: true });
  };

  runNextBenchmark();
};
