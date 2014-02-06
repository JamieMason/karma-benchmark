(function() {

  var global = this;
  var karma = global.__karma__;
  var currentGroupName = '';
  var suiteSize = 0;

  /**
   * @param {String} specName
   * @param {Function} benchmark
   */
  function addSimple(specName, benchmark) {
    global.bench.add(specName, benchmark);
  }

  /**
   * @param {String} specName
   * @param {Function} options.before
   * @param {Function} options.run
   * @param {Function} options.after
   */
  function addPrepared(specName, options) {
    var spec = {};
    spec.fn = options.run;
    if (options.before) {
      spec.setup = options.before;
    }
    if (options.run) {
      spec.fn = options.run;
    }
    if (options.after) {
      spec.teardown = options.after;
    }
    global.bench.add(specName, spec);
  }

  /**
   * @param {String} groupName
   * @param {Function} queueBenchmarks
   */
  global.benchmark = function(groupName, queueBenchmarks) {
    global.bench = global.bench || new Benchmark.Suite();
    currentGroupName = groupName;
    queueBenchmarks();
  };

  /**
   * @param {String} scenarioName
   * @param {Function|Object} benchmark
   */
  global.when = function(scenarioName, benchmark) {
    var specName = currentGroupName + ' when ' + scenarioName;
    var addSpec = typeof benchmark === 'function' ? addSimple : addPrepared;
    addSpec(specName, benchmark);
    karma.info({
      total: ++suiteSize
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
