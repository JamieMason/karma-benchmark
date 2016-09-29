// public
module.exports = {
  addBenchmark: addBenchmark,
  addSuite: addSuite,
  getSuites: getSuites
};

// implementation
var oBenchmarks = [];
var oSuites = [];

function addBenchmark(oBenchmark, hasSuite) {
  oBenchmark.hasSuite = Boolean(hasSuite);
  oBenchmarks.push(oBenchmark);
  return oBenchmark;
}

function addSuite(oSuite) {
  oSuites.push(oSuite);
  return oSuite;
}

function getSuites() {
  return oSuites;
}
