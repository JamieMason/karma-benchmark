// public
module.exports = processBenchmarks;

// implementation
function processBenchmarks(suites) {
  var focusedSuites = _.filter(suites, isFocusedSuite);

  return focusedSuites.length > 0 ?
    focusedSuites.map(focusBenchmarks) :
    suites;

  function isFocusedSuite(suite) {
    return isFocused(suite) || _.some(suite, isFocused);
  }

  function focusBenchmarks(suite) {
    var focusedBenchmarks = suite.filter(isFocused);
    var removed = suite.length - focusedBenchmarks.length;
    focusedBenchmarks.name = suite.name + ' (' + removed + ' benchmarks have been ignored)';
    return focusedBenchmarks.length ? focusedBenchmarks : suite;
  }

  function isFocused(obj) {
    return obj.runAlone === true;
  }
}
