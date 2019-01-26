import { processBenchmarks } from './process-benchmarks';
import { provideApi } from './provide-api';
import { provideDump } from './provide-dump';
import { runBenchmarks } from './run-benchmarks';
import * as store from './store';
import { WrappedBenchmark } from './wrapped-benchmark';

declare global {
  namespace NodeJS {
    interface Global {
      __coverage__: any;
      __karma__: {
        complete(result: any): void;
        info(info: any): void;
        result(result: any): void;
        start(): void;
      };
      Benchmark: WrappedBenchmark;
    }
  }
}

global.Benchmark = WrappedBenchmark;

provideApi(global);
provideDump(global);

global.__karma__.start = () => {
  runBenchmarks(global, processBenchmarks(store.getSuites()));
};
