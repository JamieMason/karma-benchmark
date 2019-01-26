# karma-benchmark

[![NPM version](http://img.shields.io/npm/v/karma-benchmark.svg?style=flat-square)](https://www.npmjs.com/package/karma-benchmark)
[![NPM downloads](http://img.shields.io/npm/dm/karma-benchmark.svg?style=flat-square)](https://www.npmjs.com/package/karma-benchmark)
[![Dependency Status](http://img.shields.io/david/JamieMason/karma-benchmark.svg?style=flat-square)](https://david-dm.org/JamieMason/karma-benchmark)
[![Gitter Chat for karma-benchmark](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/karma-benchmark)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/karma-benchmark?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

> A [Karma](http://karma-runner.github.io/) plugin to run
> [Benchmark.js](http://benchmarkjs.com/) over multiple browsers with
> [Jenkins CI](http://jenkins-ci.org/) compatible output.

## Installation

```
npm install benchmark --save-dev
npm install karma-benchmark --save-dev
```

## Karma Configuration

### Reporting results on the command line

To see jsPerf style results on the command line, install
[`karma-benchmark-reporter`](https://github.com/lazd/karma-benchmark-reporter):

```
npm install karma-benchmark-reporter --save-dev
```

Then, in **karma.conf.js**, add `benchmark` to the list of reporters:

```js
module.exports = function(config) {
  config.set({
    // Other Karma config here...
    frameworks: ['benchmark'],
    reporters: ['benchmark']
  });
};
```

Run Karma:

```
karma start
```

Then, you'll then see output that looks like:

```
Chrome 32.0.1700 (Mac OS X 10.9.1)  Array iteration: util.each at 19356910 ops/sec
Chrome 32.0.1700 (Mac OS X 10.9.1)  Array iteration: Array.forEach at 2567531 ops/sec
Chrome 32.0.1700 (Mac OS X 10.9.1)  Array search: util.contains at 12635982 ops/sec
Chrome 32.0.1700 (Mac OS X 10.9.1)  Array search: Array.indexOf at 5828437 ops/sec
Chrome 32.0.1700 (Mac OS X 10.9.1)
  Array iteration: util.each at 19356910 ops/sec (7.54x faster than Array.forEach)
  Array search: util.contains at 12635982 ops/sec (2.17x faster than Array.indexOf)
```

See the
[examples](https://github.com/JamieMason/karma-benchmark/tree/master/examples)
folder for a full example.

### Feeding Data Into Jenkins

To feed your data into Jenkins, install
[`karma-junit-reporter`](https://github.com/karma-runner/karma-junit-reporter).

```
npm install karma-junit-reporter --save-dev
```

In **karma.conf.js**, add `junit` to the list of reporters and configure the
reporter accordingly:

```js
module.exports = function(config) {
  config.set({
    // Other Karma config here...
    frameworks: ['benchmark'],
    junitReporter: {
      outputDir: 'reports',
      outputFile: 'benchmark.xml'
    },
    reporters: ['junit']
  });
};
```

### Timeouts

As large suites of Benchmarks take a long time to run, you _may_ need to
increase Karma's timeout from it's default of 60000.

```js
captureTimeout: 60000;
```

## Writing Benchmarks

Suites and benchmarks are defined using a wrapper for Benchmark.js in the form
of the `suite` and `benchmark` globals.

### Typical

In this example, a suite is defined that pits `_.each` against the native
`Array.forEach` method:

```js
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
```

### Suite options

Suite options are the same as in Benchmark.js with one exception: `onStart` and
`onComplete` can be set at the suite level.

See the
[Benchmark.js Suite constructor API docs](http://benchmarkjs.com/docs#Suite) for
a full list of options.

```js
suite(
  'Array iteration',
  function() {
    benchmark('_.each', function() {
      _.each(this.list, function(number) {
        return number;
      });
    });

    benchmark('native forEach', function() {
      this.list.forEach(function(number) {
        return number;
      });
    });
  },
  {
    onCycle: function(event) {
      var suite = this;
      var benchmark = event.target;
      console.log('Cycle completed for ' + suite.name + ': ' + benchmark.name);
    },
    onStart: function() {
      this.list = [5, 4, 3];
    },
    onComplete: function() {
      this.list = null;
    }
  }
);
```

### Benchmark options

Benchmark options are the same as in Benchmark.js. If `setup` and `teardown` are
passed to `benchmark()`, they will override `setup` and `teardown` from the
suite. Pass `null` or undefined to remove them.

See the
[Benchmark.js Benchmark constructor API docs](http://benchmarkjs.com/docs#Benchmark)
for a full list of options.

```js
suite('Iteration', function() {
  benchmark(
    '_.each with array',
    function() {
      _.each(this.list, function(number) {
        return number;
      });
    },
    {
      setup: function() {
        this.list = ['a', 'b', 'c'];
      },
      teardown: function() {
        delete this.list;
      }
    }
  );

  benchmark(
    '_.each with object',
    function() {
      _.each(this.list, function(number) {
        return number;
      });
    },
    {
      setup: function() {
        this.list = {
          0: 'a',
          1: 'b',
          2: 'c'
        };
      },
      teardown: function() {
        delete this.list;
      }
    }
  );
});
```

### Running only a specific benchmark or suite

To run only a specific benchmark, use `benchmark.only()` or `bbenchmark()`
instead of `benchmark()`:

```js
benchmark.only(function() {
  // Only this benchmark will run
  // bbenchmark() does the same thing
});

benchmark(function() {
  // This benchmark won't run
});
```

The same applies to suites with `suite.only()` and `ssuite()`.

### Skipping benchmarks & suites

To skip a benchmark, use `benchmark.skip()` or `xbenchmark()` instead of
`benchmark()`:

```js
benchmark.skip(function() {
  // This benchmark won't run
  // xbenchmark() does the same thing
});

benchmark(function() {
  // This and all other benchmarks will run
});
```

The same applies to suites with `suite.skip()` and `xsuite()`.
