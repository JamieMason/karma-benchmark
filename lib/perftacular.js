(function() {

  var global = this;
  var karma = global.__karma__;
  var suites = global.__karma_benchmark_suites__ = [];
  var curSuite;
  var totalTests = 0;

  global.suite = function(groupName, queueBenchmarks, options) {
    curSuite = new Benchmark.Suite(groupName, options);
    suites.push(curSuite);
    queueBenchmarks();
  };

  global.benchmark = function(benchName, benchmark, options) {
    curSuite.add(benchName, benchmark, options);
    karma.info({
      total: ++totalTests
    });
  };

  global.dump = function() {
    var i = 0;
    var len = arguments.length;
    var ngMock = global.angular && global.angular.mock ? global.angular.mock : null;
    var output = [];

    for (i = 0; i < arguments.length; i++) {
      output[i] = ngMock ? ngMock.dump(arguments[i]) : arguments[i];
    }

    karma.info({
      dump: output
    });
  };

}).call(this);
