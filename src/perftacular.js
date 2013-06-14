/*!
 * Copyright © 2013 Jamie Mason, @GotNoSugarBaby,
 * https://github.com/JamieMason
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (global, karma) {

  var suite;
  var suiteSize = 0;
  var currentGroupName = '';

  /**
   * @param {String} specName
   * @param {Function} benchmark
   */
  function addSimple(specName, benchmark) {
    suite.add(specName, benchmark);
  }

  /**
   * @param {String} specName
   * @param {Function} options.before
   * @param {Function} options.run
   * @param {Function} options.after
   */
  function addPrepared (specName, options) {
    var spec = {};
    spec.fn = options.run;
    if (options.before) { spec.setup = options.before; }
    if (options.run) { spec.fn = options.run; }
    if (options.after) { spec.teardown = options.after; }
    suite.add(specName, spec);
  }

  function onSuiteComplete() {
    karma.complete({
      coverage: global.__coverage__
    });
  }

  /**
   * @param {String} groupName
   * @param {Function} queueBenchmarks
   */
  global.benchmark = function(groupName, queueBenchmarks) {
    suite = suite || new Benchmark.Suite();
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

  karma.start = function(runner) {
    // just exit if no tests were added
    if (!suite) {
      onSuiteComplete();
    }
    // otherwise begin running the suite
    else {
      suite.on('cycle', function(event) {
        var result = event.target;
        karma.result({
          id: result.id,
          description: result.name,
          suite: [],
          success: true,
          skipped: false,
          time: result.stats.mean,
          log: []
        });
      }).on('complete', function() {
        onSuiteComplete();
      }).run({
        async: true
      });
    }
  };

})(window, window.__karma__);
