// 3rd party modules
var karma = require('./vendor/karma');

// modules
var store = require('./store');

// public
module.exports = runBenchmarks;

// implementation
function runBenchmarks(done) {
  var oSuites = store.getSuites();
  if (oSuites.length) {
    runSuite(oSuites.shift(), function () {
      runBenchmarks(done);
    });
  } else {
    done();
  }
}

function runSuite(oSuite, done) {
  var errors = [];
  oSuite
    .on('cycle', function (e) {
      karma.result({
        id: e.target.id,
        description: oSuite.name + ': ' + e.target.name,
        suite: [],
        success: errors.length === 0,
        log: errors,
        skipped: false,
        time: e.target.stats.mean * 1000,
        benchmark: {
          suite: oSuite.name,
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
    .on('complete',
      done
    )
    .run({
      async: true
    });
}
