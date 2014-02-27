(function() {

  var global = this;
  var karma = global.__karma__;
  var suites = global.__karma_benchmark_suites__ = [];
  var totalTests = 0;

  /**
   * Copy to target every member of source that target does not share a member of the same name.
   * @param  {Object} target
   * @param  {Object} source
   * @return {Object}
   */
  function extendIf(target, source) {
    for (var key in source) {
      if (!target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
    return target;
  }

  /**
   * @param {Object} newSuite
   */
  function addSuiteToReport(newSuite) {
    suites.push(newSuite);
  }

  /**
   * Declare a new Benchmark.js suite to be reported to Karma.
   * @param  {String}   suiteName
   * @param  {Function} addAllBenchmarksToSuite
   * @param  {Object}   [suiteOptions]
   * @return {Object}   suite
   */
  global.suite = function(suiteName, addAllBenchmarksToSuite, suiteOptions) {

    var currentSuite;

    suiteOptions = suiteOptions || {};

    /**
     * Declare a new Benchmark.js benchmark to be run as part of this suite.
     * @param  {[type]} benchName
     * @param  {Function} benchmark
     * @param  {Object} [benchOptions]
     */
    function addBenchmarkToSuite(benchName, benchmark, benchOptions) {
      currentSuite.add(benchName, benchmark, extendIf(benchOptions || {}, suiteOptions));
      karma.info({
        total: ++totalTests
      });
    }

    currentSuite = new Benchmark.Suite(suiteName, suiteOptions);
    addSuiteToReport(currentSuite);
    global.benchmark = addBenchmarkToSuite;
    addAllBenchmarksToSuite();
    return currentSuite;

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
