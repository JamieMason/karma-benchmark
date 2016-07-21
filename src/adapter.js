(function() {

  var global = this;
  var karma = global.__karma__;

  karma.start = function(runner) {
    var suites = global.__karma_benchmark_suites__;
    var hasTests = !!suites.length;
    var errors = [];

    if (!hasTests) {
      return complete();
    }

    runNextSuite();

    function logResult(event) {
      var suite = this;
      var result = event.target;
      karma.result({
        id: result.id,
        description: suite.name + ': ' + result.name,
        suite: [],
        success: errors.length === 0,
        log: errors,
        skipped: false,
        time: result.stats.mean * 1000,
        benchmark: {
          suite: suite.name,
          name: result.name,
          stats: result.stats,
          count: result.count,
          cycles: result.cycles,
          error: result.error,
          hz: result.hz
        }
      });

      // Reset errors
      errors = [];
    }

    function logError(evt) {
      errors.push(evt.target.error.toString());
    }

    function runNextSuite() {
      if (!suites.length) {
        return complete();
      }

      suites.shift()
        .on('cycle', logResult)
        .on('abort error', logError)
        .on('complete', runNextSuite)
        .run({
          async: true
        });
    }

    function complete() {
      karma.complete({
        coverage: global.__coverage__
      });
    }
  };

}).call(this);
