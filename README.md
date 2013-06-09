# Perftacular

Continuous JavaScript Performance Monitoring with [Benchmark.js](http://benchmarkjs.com/), [Karma/Testacular](http://karma-runner.github.io/) and [Jenkins CI](http://jenkins-ci.org/).

## Installation

    npm install perftacular --save-dev

## Usage

Example here from the [Perftacular-Underscore](https://github.com/JamieMason/Perftacular-Underscore) example project.

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

## Karma Configuration

Include the perftacular script before any of your scripts or tests.

    files = [
      'node_modules/perftacular/perftacular-*.js',
      'src/**/*.js',
      'perf/**/*.perf.js'
    ];

Use the junit reporter so that a test-results.xml file is created that you can feed into Jenkins.

    reporters = ['progress', 'junit'];
