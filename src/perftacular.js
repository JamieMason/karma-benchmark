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

  global.benchmark = function (groupName, queueBenchmarks) {
    suite = suite || new Benchmark.Suite();
    currentGroupName = groupName;
    queueBenchmarks();
  };

  global.when = function (scenarioName, benchmark) {
    suite.add(currentGroupName + ' when ' + scenarioName, benchmark);
    karma.info({
      total: ++suiteSize
    });
  };

  global.dump = function () {
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

  karma.start = function (runner) {
    if (suite) {
      suite.on('cycle', function (event) {
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
      }).on('complete', function () {
        karma.complete({
          coverage: global.__coverage__
        });
      }).run({
        async: true
      });
    } else {
      karma.complete({
        coverage: global.__coverage__
      });
    }
  };

})(window, window.__karma__);
