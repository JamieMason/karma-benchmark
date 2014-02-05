(function() {

var global = this;

var karma = global.__karma__;

var bench = global.bench = new Benchmark.Suite();
var errors = [];

karma.start = function () {
  bench.on('start', function (evt) {
    karma.info({
      total: bench.length
    });
  });

  bench.on('abort error', function (evt) {
    errors.push(evt.target.error);
  });

  bench.on('cycle', function (evt) {
    var result = evt.target;
    karma.result({
      id: result.id,
      description: result + "",
      suite: [ ],
      success: errors.length === 0,
      time: result.times.elapsed * 1000,
      log: errors
    });
  });

  bench.on('complete', function () {
    karma.complete({ coverage: global.__coverage__ });
  });

  bench.run();
};

}).call(this);
