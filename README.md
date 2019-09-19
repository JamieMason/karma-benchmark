# karma-benchmark

> A [Karma](http://karma-runner.github.io/) plugin to run [Benchmark.js](http://benchmarkjs.com/) over multiple browsers with CI compatible output.

[![NPM version](http://img.shields.io/npm/v/karma-benchmark.svg?style=flat-square)](https://www.npmjs.com/package/karma-benchmark) [![NPM downloads](http://img.shields.io/npm/dm/karma-benchmark.svg?style=flat-square)](https://www.npmjs.com/package/karma-benchmark) [![Build Status](http://img.shields.io/travis/JamieMason/karma-benchmark/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/karma-benchmark) [![Maintainability](https://api.codeclimate.com/v1/badges/966349c0150b475c60fe/maintainability)](https://codeclimate.com/github/JamieMason/karma-benchmark/maintainability)

## Table of Contents

-   [🌩 Installation](#-installation)
-   [🕵🏾‍♀️ Reporters](#♀️-reporters)
-   [⚖️ Configuration](#️-configuration)
-   [👩🏻‍🔬 Writing Benchmarks](#-writing-benchmarks)
-   [🙋🏽‍♂️ Getting Help](#♂️-getting-help)
-   [👀 Other Projects](#-other-projects)
-   [🤓 Author](#-author)

## 🌩 Installation

    npm install --save-dev benchmark karma-benchmark

## 🕵🏾‍♀️ Reporters

-   [karma-benchmark-json-reporter](https://github.com/etpinard/karma-benchmark-json-reporter) by [@etpinard](https://github.com/etpinard/)
-   [karma-benchmark-plotly-reporter](https://github.com/etpinard/karma-benchmark-plotly-reporter) by [@etpinard](https://github.com/etpinard/)
-   [karma-benchmarkjs-reporter](https://github.com/FormidableLabs/karma-benchmarkjs-reporter) by [@FormidableLabs](https://github.com/FormidableLabs/)
-   [karma-benchmark-reporter](https://github.com/lazd/karma-benchmark-reporter) by [@lazd](https://github.com/lazd/)

## ⚖️ Configuration

In **karma.conf.js**, add `'benchmark'` to the list of **frameworks**:

```js
module.exports = config => {
  config.set({
    autoWatch: false,
    browsers: ["Chrome"],
    concurrency: 1,
    files: ["bench/**/*.bench.js"],
    frameworks: ["benchmark"],
    singleRun: true
  });
};
```

### Terminal Reporting

Now let's add [`karma-benchmarkjs-reporter`](https://github.com/FormidableLabs/karma-benchmarkjs-reporter) by [@FormidableLabs](https://github.com/FormidableLabs/) to report results to the Terminal:

    npm install --save-dev karma-benchmarkjs-reporter

In **karma.conf.js**, add `'benchmark'` to the list of **reporters**:

```diff
module.exports = (config) => {
  config.set({
    autoWatch: false,
    browsers: ['Chrome'],
    concurrency: 1,
    files: ['bench/**/*.bench.js'],
    frameworks: ['benchmark'],
+   reporters: ['benchmark'],
    singleRun: true
  });
};
```

### JUnit Reporting

To feed our data into Continuous Integration, we can use the [`karma-junit-reporter`](https://github.com/karma-runner/karma-junit-reporter).

    npm install --save-dev karma-junit-reporter

In **karma.conf.js**, add `junit` to the list of **reporters** and configure the reporter accordingly:

```diff
module.exports = (config) => {
  config.set({
    autoWatch: false,
    browsers: ['Chrome'],
    concurrency: 1,
    files: ['bench/**/*.bench.js'],
    frameworks: ['benchmark'],
+   junitReporter: {
+     outputDir: 'reports',
+     outputFile: 'benchmark.xml'
+   },
-   reporters: ['benchmark'],
+   reporters: ['benchmark', 'junit'],
    singleRun: true
  });
};
```

### Data Visualisation Reporting

With a free [plot.ly](https://plot.ly) account, we can generate visualisations using the [karma-benchmark-plotly-reporter](https://github.com/etpinard/karma-benchmark-plotly-reporter) by [@etpinard](https://github.com/etpinard/).

    npm install --save-dev karma-benchmark-plotly-reporter

In **karma.conf.js**, add `benchmark-plotly` to the list of **reporters** and configure the reporter accordingly:

```diff
module.exports = (config) => {
  config.set({
    autoWatch: false,
+   benchmarkPlotlyReporter: {
+     username: '<your username>',
+     apiKey: '<your api key>',
+     cloudFilename: 'plotly-example',
+     imageFilename: 'plotly-example.png'
+   },
    browsers: ['Chrome'],
    concurrency: 1,
    files: ['bench/**/*.bench.js'],
    frameworks: ['benchmark'],
    junitReporter: {
      outputDir: 'reports',
      outputFile: 'benchmark.xml'
    },
-   reporters: ['benchmark', 'junit'],
+   reporters: ['benchmark', 'benchmark-plotly', 'junit'],
    singleRun: true
  });
};
```

## 👩🏻‍🔬 Writing Benchmarks

Benchmarks can be written by using the original [Benchmark.js](https://benchmarkjs.com) API, but a wrapper API is also provided by karma-benchmark in the form of the `suite` and `benchmark` globals. The karma-benchmark API aims to make the process of writing Benchmarks feel familiar to users of [Jasmine](https://jasmine.github.io/) or [Jest](https://jestjs.io/).

In this example, a suite is defined that pits `_.each` against the native `Array.forEach` method:

```js
suite("Array iteration", () => {
  benchmark("_.each", () => {
    _.each([1, 2, 3], el => {
      return el;
    });
  });

  benchmark("native forEach", () => {
    [1, 2, 3].forEach(el => {
      return el;
    });
  });
});
```

### Suite options

Suite options are the same as in Benchmark.js with one exception: `onStart` and `onComplete` can be set at the suite level.

See the [Benchmark.js Suite constructor API docs](http://benchmarkjs.com/docs#Suite) for a full list of options.

```js
suite(
  "Array iteration",
  () => {
    benchmark("_.each", () => {
      _.each(this.list, number => {
        return number;
      });
    });

    benchmark("native forEach", () => {
      this.list.forEach(number => {
        return number;
      });
    });
  },
  {
    onCycle(event) {
      var suite = this;
      var benchmark = event.target;
      console.log("Cycle completed for " + suite.name + ": " + benchmark.name);
    },
    onStart() {
      this.list = [5, 4, 3];
    },
    onComplete() {
      this.list = null;
    }
  }
);
```

### Benchmark options

Benchmark options are the same as in Benchmark.js. If `setup` and `teardown` are passed to `benchmark()`, they will override `setup` and `teardown` from the suite. Pass `null` or undefined to remove them.

See the [Benchmark.js Benchmark constructor API docs](http://benchmarkjs.com/docs#Benchmark) for a full list of options.

```js
suite("Iteration", () => {
  benchmark(
    "_.each with array",
    () => {
      _.each(this.list, number => {
        return number;
      });
    },
    {
      setup() {
        this.list = ["a", "b", "c"];
      },
      teardown() {
        delete this.list;
      }
    }
  );

  benchmark(
    "_.each with object",
    () => {
      _.each(this.list, number => {
        return number;
      });
    },
    {
      setup() {
        this.list = { 0: "a", 1: "b", 2: "c" };
      },
      teardown() {
        delete this.list;
      }
    }
  );
});
```

### Running only a specific benchmark or suite

To run only a specific benchmark, use `benchmark.only()` or `bbenchmark()` instead of `benchmark()`:

```js
benchmark.only(() => {
  // Only this benchmark will run
  // bbenchmark() does the same thing
});

benchmark(() => {
  // This benchmark won't run
});
```

The same applies to suites with `suite.only()` and `ssuite()`.

### Skipping benchmarks & suites

To skip a benchmark, use `benchmark.skip()` or `xbenchmark()` instead of `benchmark()`:

```js
benchmark.skip(() => {
  // This benchmark won't run
  // xbenchmark() does the same thing
});

benchmark(() => {
  // This and all other benchmarks will run
});
```

The same applies to suites with `suite.skip()` and `xsuite()`.

## 🙋🏽‍♂️ Getting Help

Get help with issues by creating a [Bug Report] or discuss ideas by opening a [Feature Request].

[bug report]: https://github.com/JamieMason/karma-benchmark/issues/new?template=bug_report.md

[feature request]: https://github.com/JamieMason/karma-benchmark/issues/new?template=feature_request.md

## 👀 Other Projects

If you find my Open Source projects useful, please share them ❤️

-   [**add-matchers**](https://github.com/JamieMason/add-matchers)<br>Write useful test matchers compatible with Jest and Jasmine.
-   [**eslint-formatter-git-log**](https://github.com/JamieMason/eslint-formatter-git-log)<br>ESLint Formatter featuring Git Author, Date, and Hash
-   [**eslint-plugin-move-files**](https://github.com/JamieMason/eslint-plugin-move-files)<br>Move and rename files while keeping imports up to date
-   [**eslint-plugin-prefer-arrow-functions**](https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions)<br>Convert functions to arrow functions
-   [**get-time-between**](https://github.com/JamieMason/get-time-between#readme)<br>Measure the amount of time during work hours between two dates
-   [**image-optimisation-tools-comparison**](https://github.com/JamieMason/image-optimisation-tools-comparison)<br>A benchmarking suite for popular image optimisation tools.
-   [**ImageOptim-CLI**](https://github.com/JamieMason/ImageOptim-CLI)<br>Automates ImageOptim, ImageAlpha, and JPEGmini for Mac to make batch optimisation of images part of your automated build process.
-   [**is-office-hours**](https://github.com/JamieMason/is-office-hours#readme)<br>Determine whether a given date is within office hours
-   [**Jasmine-Matchers**](https://github.com/JamieMason/Jasmine-Matchers)<br>Write Beautiful Specs with Custom Matchers
-   [**jest-fail-on-console-reporter**](https://github.com/JamieMason/jest-fail-on-console-reporter#readme)<br>Disallow untested console output produced during tests
-   [**karma-jasmine-matchers**](https://github.com/JamieMason/karma-jasmine-matchers)<br>A Karma plugin - Additional matchers for the Jasmine BDD JavaScript testing library.
-   [**logservable**](https://github.com/JamieMason/logservable)<br>git log as an observable stream of JSON objects
-   [**self-help**](https://github.com/JamieMason/self-help#readme)<br>Interactive Q&A Guides for Web and the Command Line
-   [**syncpack**](https://github.com/JamieMason/syncpack#readme)<br>Manage multiple package.json files, such as in Lerna Monorepos and Yarn Workspaces

## 🤓 Author

<img src="https://www.gravatar.com/avatar/acdf106ce071806278438d8c354adec8?s=100" align="left">

I'm [Jamie Mason] from [Leeds] in England, I began Web Design and Development in 1999 and have been Contracting and offering Consultancy as Fold Left Ltd since 2012. Who I've worked with includes [Sky Sports], [Sky Bet], [Sky Poker], The [Premier League], [William Hill], [Shell], [Betfair], and Football Clubs including [Leeds United], [Spurs], [West Ham], [Arsenal], and more.

<div align="center">

[![Follow JamieMason on GitHub][github badge]][github]      [![Follow fold_left on Twitter][twitter badge]][twitter]

</div>

<!-- images -->

[github badge]: https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow

[twitter badge]: https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow

<!-- links -->

[arsenal]: https://www.arsenal.com

[betfair]: https://www.betfair.com

[github]: https://github.com/JamieMason

[jamie mason]: https://www.linkedin.com/in/jamiemasonleeds

[leeds united]: https://www.leedsunited.com/

[leeds]: https://www.instagram.com/visitleeds

[premier league]: https://www.premierleague.com

[shell]: https://www.shell.com

[sky bet]: https://www.skybet.com

[sky poker]: https://www.skypoker.com

[sky sports]: https://www.skysports.com

[spurs]: https://www.tottenhamhotspur.com

[twitter]: https://twitter.com/fold_left

[west ham]: https://www.whufc.com

[william hill]: https://www.williamhill.com
