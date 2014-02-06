(function() {

  var global = this;
  var karma = global.__karma__;

  function complete() {
    karma.complete({
      coverage: global.__coverage__
    });
  }

  karma.start = function(runner) {

    var bench = global.bench;
    var hasTests = !! bench;
    var errors = [];

    if (!hasTests) {
      return complete();
    }

    bench.on('abort error', function(evt) {
      errors.push(evt.target.error);
    });

    bench.on('cycle', function(evt) {
      var result = evt.target;
      karma.result({
        id: result.id,
        description: result.name,
        suite: [],
        success: errors.length === 0,
        skipped: false,
        time: result.stats.mean * 1000,
        log: errors
      });
    });

    bench.on('complete', complete);

    bench.run({
      async: true
    });

  };

}).call(this);
