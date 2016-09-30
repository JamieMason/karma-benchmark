/* global suite, benchmark, _ */
suite('Array iteration', function() {
  benchmark('_.each', function() {
    _.each([1, 2, 3], function(el) {
      return el;
    });
  });

  benchmark('native forEach', function() {
    [1, 2, 3].forEach(function(el) {
      return el;
    });
  });
});

suite('Plucking key names', function() {
  benchmark('_.keys', function() {
    _.keys({
      a: 1,
      b: 2,
      c: 3
    });
  });

  benchmark('Object.keys', function() {
    Object.keys({
      a: 1,
      b: 2,
      c: 3
    });
  });
});
