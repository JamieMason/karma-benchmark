(function () {
  var global = this;
  var Benchmark = global.Benchmark;
  var karma = global.__karma__;
  var suites = global.__karma_benchmark_suites__ = []; // eslint-disable-line camelcase
  var totalTests = 0;
  var ignoreOtherSuites = false;
  var ignoreOtherBenchmarks = false;
  var noop = function () {};

  /**
   * Copy to target every member of source that target does not share a member of the same name.
   * @param  {Object} target
   * @param  {Object} source
   * @return {Object}
   */
  function extendIf(target, source) {
    for (var key in source) {
      if (key in target) {
        continue;
      }
      target[key] = source[key];
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
  var addSuite = global.suite = function (suiteName, addAllBenchmarksToSuite, suiteOptions, onlyRunThisSuite) {
    if (onlyRunThisSuite) {
      // Reset count
      totalTests = 0;

      // Mark that we shouldn't add other suites
      ignoreOtherSuites = true;

      // Drop previously added suites
      suites.length = 0;
    } else if (ignoreOtherSuites) {
      // Skip this suite
      return;
    }

    var currentSuite;
    var benchmarks = [];

    suiteOptions = suiteOptions || {};

    /**
     * Declare a new Benchmark.js benchmark to be run as part of this suite.
     * @param  {[type]} benchName
     * @param  {Function} benchmark
     * @param  {Object} [benchOptions]
     */
    function queueBenchmarkAdd(benchName, benchmark, benchOptions, onlyRunThisBenchmark) {
      if (onlyRunThisBenchmark) {
        // Remove other suites
        suites.length = 0;
        suites.push(currentSuite);

        // Make sure subsequent suites are ignored
        ignoreOtherSuites = true;

        // Remove other benchmarks in this suite
        benchmarks.length = 0;

        // Make sure subsequent benchmarks are ignored
        ignoreOtherBenchmarks = true;

        // Reset test count
        totalTests = 0;
      } else if (ignoreOtherBenchmarks) {
        // Skip this benchmark
        return;
      }

      // Add benchmark to the queue
      benchmarks.push({
        benchName: benchName,
        benchmark: benchmark,
        benchOptions: benchOptions
      });
    }

    /**
     * Skip this benchmark.
     * @param  {[type]} benchName
     * @param  {Function} benchmark
     * @param  {Object} [benchOptions]
     */
    queueBenchmarkAdd.skip = global.xbenchmark = noop;

    /*
     * Only run this benchmark.
     * @param  {[type]} benchName
     * @param  {Function} benchmark
     * @param  {Object} [benchOptions]
     */
    queueBenchmarkAdd.only = global.bbenchmark = function (benchName, benchmark, benchOptions) {
      // Add only this benchmark to the queue
      queueBenchmarkAdd(benchName, benchmark, benchOptions, true);
    };

    /**
     * Actually adds a benchmark to the suite
     * @param  {Object} bench
     * @ignore
     */
    function doAdd(bench) {
      currentSuite.add(bench.benchName, bench.benchmark, extendIf(bench.benchOptions || {}, suiteOptions));
      karma.info({
        total: ++totalTests
      });
    }

    currentSuite = new Benchmark.Suite(suiteName, suiteOptions);
    addSuiteToReport(currentSuite);
    global.benchmark = queueBenchmarkAdd;
    addAllBenchmarksToSuite();

    // Add each of the queued benchmarks
    benchmarks.forEach(doAdd);

    return currentSuite;
  };

  /**
   * Skip this suite.
   * @param  {String}   suiteName
   * @param  {Function} addAllBenchmarksToSuite
   * @param  {Object}   [suiteOptions]
   * @return {Object}   suite
   */
  global.suite.skip = global.xsuite = noop;

  /**
   * Only run this suite.
   * @param  {String}   suiteName
   * @param  {Function} addAllBenchmarksToSuite
   * @param  {Object}   [suiteOptions]
   * @return {Object}   suite
   */
  global.suite.only = global.ssuite = function (suiteName, addAllBenchmarksToSuite, suiteOptions) {
    // Add the suite, mark it as the only suite to run
    addSuite(suiteName, addAllBenchmarksToSuite, suiteOptions, true);
  };

  global.dump = function () {
    var i = 0;
    var len = arguments.length;
    var ngMock = global.angular && global.angular.mock ? global.angular.mock : null;
    var output = [];

    for (i = 0; i < len; i++) {
      output[i] = ngMock ? ngMock.dump(arguments[i]) : arguments[i];
    }

    karma.info({
      dump: output
    });
  };
}).call(this);
