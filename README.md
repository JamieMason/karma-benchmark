# karma-benchmark (Née Perftacular)

> A [Karma](http://karma-runner.github.io/) plugin to run [Benchmark.js](http://benchmarkjs.com/) over multiple browsers with [Jenkins CI](http://jenkins-ci.org/) compatible output.

## Installation

```shell
npm install karma-benchmark --save-dev
```

## Karma Configuration

### Reporting results on the command line

To see jsPerf style results on the command line, install [`karma-benchmark-reporter`](https://github.com/lazd/karma-benchmark-reporter):

```shell
npm install karma-benchmark-reporter --save-dev
```

Then, in **karma.conf.js**, add `benchmark` to the list of reporters:

```javascript
module.exports = function(config) {
  config.set({
    // Other Karma config here...
    frameworks: ['benchmark'],
    reporters: ['benchmark']
  });
};
```

Run Karma:

```shell
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

See [`karma-benchmark-example`](https://github.com/lazd/karma-benchmark-example) for a full example.

### Feeding Data Into Jenkins

To feed your data into Jenkins, install [`karma-junit-reporter`](https://github.com/karma-runner/karma-junit-reporter).

```shell
npm install karma-junit-reporter --save-dev
```

In **karma.conf.js**, add `junit` to the list of reporters and configure the reporter accordingly:

```javascript
module.exports = function(config) {
  config.set({
    // Other Karma config here...
    frameworks: ['benchmark'],
    reporters: ['junit'],
    junitReporter: {
      suite: 'unit',
      outputFile: 'build/junit-benchmark-results.xml'
    }
  });
};
```

### Timeouts

As large suites of Benchmarks take a long time to run, you _may_ need to increase Karma's timeout from it's default of 60000.

```javascript
captureTimeout: 60000
```

## Writing Benchmarks

Suites and benchmarks are defined using a wrapper for Benchmark.js in the form of the `suite` and `benchmark` globals.

### Typical

In this example, a suite is defined that pits `_.each` against the native `Array.forEach` method:

```javascript
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

Suite options are the same as in Benchmark.js with one exception: `setup` and `teardown` can be set at the suite level.

See the [Benchmark.js Suite constructor API docs](http://benchmarkjs.com/docs#Suite) for a full list of options.

```javascript
suite('Array iteration', function() {
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
}, {
  onCycle: function(event) {
    var suite = this;
    var benchmark = event.target;
    console.log('Cycle completed for ' + suite.name + ': ' + benchmark.name);
  },
  setup: function() {
    this.list = [5, 4, 3];
  },
  teardown: function() {
    this.list = null;
  }
});
```


### Benchmark options

Benchmark options are the same as in Benchmark.js. If `setup` and `teardown` are passed to `benchmark()`, they will override `setup` and `teardown` from the suite. Pass `null` or undefined to remove them.

See the [Benchmark.js Benchmark constructor API docs](http://benchmarkjs.com/docs#Benchmark) for a full list of options.

```javascript
suite('Iteration', function() {
  benchmark('_.each with array', function() {
    _.each(this.list, function(number) {
      return number;
    });
  }, {
    setup: function() {
      this.list = ['a', 'b', 'c'];
    },
    teardown: function() {
      delete this.list
    }
  });

  benchmark('_.each with object', function() {
    _.each(this.list, function(number) {
      return number;
    });
  }, {
    setup: function() {
      this.list = {
        0: 'a',
        1: 'b',
        2: 'c'
      };
    },
    teardown: function() {
      delete this.list
    }
  });
});
```
