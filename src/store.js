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
  console.log('benchmark added:', oBenchmark, oBenchmarks);
  return oBenchmark;
}

function addSuite(oSuite) {
  oSuites.push(oSuite);
  console.log('suite added:', oSuite, oSuites);
  return oSuite;
}

function getSuites() {
  return oSuites;
}
