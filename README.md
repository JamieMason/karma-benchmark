# karma-benchmark (Née Perftacular)

> A [Karma](http://karma-runner.github.io/) plugin to run [Benchmark.js](http://benchmarkjs.com/) over multiple browsers with [Jenkins CI](http://jenkins-ci.org/) compatible output.

## Installation

    npm install karma-benchmark --save-dev

## Karma Configuration

```javascript
module.exports = function(config) {
  config.set({
    // Everything discussed below goes in here.
    // Other values such as browsers, files, autoWatch, reporters etc.
    // are needed as normal, but have been left out of these example.
  });
};
```

### Adding karma-benchmark

In the options object supplied to config.set(), add `benchmark` to the list of frameworks in **karma.conf.js**.

```javascript
frameworks: ['benchmark']
```

### Feeding Data Into Jenkins

If you'd like to feed your data into Jenkins, install the jUnit reporter.

    npm install karma-junit-reporter --save-dev

Then add to the options object supplied to config.set(), the `junitReporter` configuration with the path you want the output xml to be written to.

```javascript
junitReporter: {
  suite: 'unit',
  outputFile: 'build/junit-benchmark-results.xml'
}
```

### Timeouts

As large suites of Benchmarks take a long time to run, you _may_ need to increase Karma's timeout from it's default of 60000.

```javascript
captureTimeout: 60000
```

## Writing Benchmarks

Benchmarks can be written as normal using the `var suite = new Benchmark.Suite;` format detailed at [benchmarkjs.com](http://benchmarkjs.com) or with an optional wrapper provided for Benchmark.js that offers a coding style familiar to users of [Jasmine](http://jasmine.github.io/) and [Mocha](http://visionmedia.github.io/mocha/).

### Typical

```javascript
benchmark('_.each', function () {
  when('iterating over an array', function () {
    _.each([1, 2, 3], function(el){
      return el;
    });
  });
  when('iterating over an object', function () {
    _.each({one : 1, two : 2, three : 3}, function(el){
      return el;
    });
  });
});
```

### Setup/Teardown

The equivalent of the above `_.each when iterating over an array` benchmark with setup and teardown methods is as follows.

```javascript
benchmark('_.each', function () {
  when('iterating over an array', {
    before: function() {
      this.list = [5, 4, 3];
    },
    run: function() {
      _.each(this.list, function(el) {
        return el * Math.random();
      });
    },
    after: function() {
      this.list = null;
    }
  });
});
```
