// public
module.exports = runBenchmarks;

// implementation
function runBenchmarks(obj, suites) {
  runNextBenchmark();

  function runNextBenchmark() {
    if (suites.length) {
      runSuite(suites.shift());
    } else {
      onComplete();
    }
  }

  function onComplete() {
    obj.__karma__.complete({
      coverage: obj.__coverage__
    });
  }

  function runSuite(suite) {
    var errors = [];
    suite
      .on('cycle', function (e) {
        obj.__karma__.result({
          id: e.target.id,
          description: suite.name + ': ' + e.target.name,
          suite: [],
          success: errors.length === 0,
          log: errors,
          skipped: false,
          time: e.target.stats.mean * 1000,
          benchmark: {
            suite: suite.name,
            name: e.target.name,
            stats: e.target.stats,
            count: e.target.count,
            cycles: e.target.cycles,
            error: e.target.error,
            hz: e.target.hz
          }
        });
        errors = [];
      })
      .on('abort error', function (e) {
        errors.push(e.target.error.toString());
      })
      .on('complete', runNextBenchmark)
      .run({
        async: true
      });
  }
}
